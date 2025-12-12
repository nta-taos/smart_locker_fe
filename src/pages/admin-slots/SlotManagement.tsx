import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { AppstoreOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { type CreateSlotDto, type LockerSlot, adminApi } from '@/api/adminApi';
import {
  adminBuildingsAtom,
  adminLoadingAtom,
  adminLockersAtom,
  adminSlotsAtom,
} from '@/recoil/atom/adminAtom';
import { extractErrorMessage } from '@/utils/error.utils';

import '../admin-buildings/BuildingManagement.css';

const SlotManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<LockerSlot | null>(null);
  const [filterBuildingId, setFilterBuildingId] = useState<number>();
  const [filterLockerId, setFilterLockerId] = useState<number>();
  const [modalBuildingId, setModalBuildingId] = useState<number>();
  const [form] = Form.useForm();
  const setSlots = useSetRecoilState(adminSlotsAtom);
  const setLockers = useSetRecoilState(adminLockersAtom);
  const setBuildings = useSetRecoilState(adminBuildingsAtom);
  const setLoading = useSetRecoilState(adminLoadingAtom);
  const slots = useRecoilValue(adminSlotsAtom);
  const lockers = useRecoilValue(adminLockersAtom);
  const buildings = useRecoilValue(adminBuildingsAtom);
  const loading = useRecoilValue(adminLoadingAtom);

  useEffect(() => {
    fetchBuildings();
    fetchLockers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterLockerId) {
      fetchSlots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLockerId]);

  const fetchSlots = async () => {
    if (!filterLockerId) {
      setSlots([]);
      return;
    }

    try {
      setLoading(true);
      const response = await adminApi.getSlots(filterLockerId);
      setSlots(response.data);
    } catch {
      message.error('Không thể tải danh sách ngăn');
    } finally {
      setLoading(false);
    }
  };

  const fetchBuildings = async () => {
    try {
      const response = await adminApi.getBuildings();
      setBuildings(response.data);
    } catch {
      // Silent fail
    }
  };

  const fetchLockers = async () => {
    try {
      const response = await adminApi.getLockers();
      setLockers(response.data);
    } catch {
      // Silent fail
    }
  };

  const handleBuildingChange = (buildingId: number) => {
    setFilterBuildingId(buildingId);
    setFilterLockerId(undefined);
    setSlots([]);
  };

  const handleLockerChange = (lockerId: number) => {
    setFilterLockerId(lockerId);
  };

  const showModal = (slot?: LockerSlot) => {
    if (slot) {
      setEditingSlot(slot);
      setModalBuildingId(slot.locker.building.id);
      form.setFieldsValue({
        buildingId: slot.locker.building.id,
        lockerId: slot.locker.id,
        size: slot.size,
        hw_index: slot.hw_index,
        status: slot.status,
      });
    } else {
      setEditingSlot(null);
      // Pre-fill with current filter selections
      if (filterBuildingId && filterLockerId) {
        setModalBuildingId(filterBuildingId);
        form.setFieldsValue({
          buildingId: filterBuildingId,
          lockerId: filterLockerId,
        });
      } else {
        setModalBuildingId(undefined);
        form.resetFields();
      }
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingSlot(null);
    setModalBuildingId(undefined);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data: CreateSlotDto = {
        lockerId: values.lockerId,
        size: values.size,
        hw_index: parseInt(values.hw_index),
      };

      if (editingSlot) {
        await adminApi.updateSlot(editingSlot.id, data);
        message.success('Cập nhật ngăn thành công');
      } else {
        await adminApi.createSlot(data);
        message.success('Tạo ngăn mới thành công');
      }

      handleCancel();
      fetchSlots();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminApi.deleteSlot(id);
      message.success('Xóa ngăn thành công');
      fetchSlots();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  const sizeOptions = [
    { value: 0, label: 'Nhỏ' },
    { value: 1, label: 'Trung bình' },
    { value: 2, label: 'Lớn' },
    { value: 3, label: 'Rất lớn' },
  ];

  const statusOptions = [
    { value: 0, label: 'Empty', color: 'success' },
    { value: 1, label: 'Occupied', color: 'error' },
    { value: 2, label: 'Locked', color: 'warning' },
  ];

  const filteredLockersForFilter = filterBuildingId
    ? lockers.filter((l) => l.building.id === filterBuildingId)
    : [];

  const filteredLockersForModal = modalBuildingId
    ? lockers.filter((l) => l.building.id === modalBuildingId)
    : lockers;

  const columns: ColumnsType<LockerSlot> = [
    {
      title: 'Tủ',
      key: 'locker',
      render: (_, record) => `${record.locker.building.name} - ${record.locker.code}`,
    },
    {
      title: 'Kích thước',
      dataIndex: 'size',
      key: 'size',
      render: (size) => {
        const option = sizeOptions.find((opt) => opt.value === size);
        return option?.label || size;
      },
    },
    {
      title: 'HW Index',
      dataIndex: 'hw_index',
      key: 'hw_index',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const option = statusOptions.find((opt) => opt.value === status);
        return <Tag color={option?.color}>{option?.label || 'Unknown'}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" ghost icon={<EditOutlined />} onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa ngăn"
            description="Bạn có chắc chắn muốn xóa ngăn này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button type="primary" danger ghost icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="building-management">
      <div className="page-header">
        <div>
          <h1>
            <AppstoreOutlined /> Quản lý Ngăn tủ
          </h1>
          <p>Chọn tòa nhà và tủ để quản lý ngăn tủ</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          size="large"
          disabled={!filterLockerId}
        >
          Thêm ngăn
        </Button>
      </div>

      <div style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <span style={{ fontWeight: 500 }}>Chọn tòa nhà:</span>
            <Select
              style={{ width: '100%' }}
              placeholder="Chọn tòa nhà"
              value={filterBuildingId}
              onChange={handleBuildingChange}
              allowClear
              showSearch
              optionFilterProp="children"
              onClear={() => {
                setFilterBuildingId(undefined);
                setFilterLockerId(undefined);
                setSlots([]);
              }}
            >
              {buildings.map((b) => (
                <Select.Option key={b.id} value={b.id}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>

        <div style={{ flex: 1 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <span style={{ fontWeight: 500 }}>Chọn tủ:</span>
            <Select
              style={{ width: '100%' }}
              placeholder="Chọn tủ"
              value={filterLockerId}
              onChange={handleLockerChange}
              disabled={!filterBuildingId}
              allowClear
              showSearch
              optionFilterProp="children"
              onClear={() => {
                setFilterLockerId(undefined);
                setSlots([]);
              }}
            >
              {filteredLockersForFilter.map((l) => (
                <Select.Option key={l.id} value={l.id}>
                  {l.code} (Tầng {l.floor || 'N/A'})
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={slots}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Tổng ${total} ngăn`,
        }}
        scroll={{ x: 800 }}
        locale={{
          emptyText: filterLockerId
            ? 'Không có ngăn tủ nào'
            : 'Vui lòng chọn tòa nhà và tủ để xem danh sách ngăn',
        }}
      />

      <Modal
        title={editingSlot ? 'Chỉnh sửa ngăn' : 'Thêm ngăn mới'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={editingSlot ? 'Cập nhật' : 'Tạo mới'}
        cancelText="Hủy"
        width={500}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
            label="Tòa nhà"
            name="buildingId"
            rules={[{ required: true, message: 'Vui lòng chọn tòa nhà' }]}
          >
            <Select
              placeholder="Chọn tòa nhà"
              showSearch
              optionFilterProp="children"
              onChange={(value) => {
                setModalBuildingId(value);
                form.setFieldsValue({ lockerId: undefined });
              }}
            >
              {buildings.map((b) => (
                <Select.Option key={b.id} value={b.id}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tủ"
            name="lockerId"
            rules={[{ required: true, message: 'Vui lòng chọn tủ' }]}
          >
            <Select
              placeholder="Chọn tủ"
              disabled={!modalBuildingId}
              showSearch
              optionFilterProp="children"
            >
              {filteredLockersForModal.map((l) => (
                <Select.Option key={l.id} value={l.id}>
                  {l.code}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Kích thước"
            name="size"
            rules={[{ required: true, message: 'Vui lòng chọn kích thước' }]}
          >
            <Select>
              {sizeOptions.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Hardware Index"
            name="hw_index"
            rules={[{ required: true, message: 'Vui lòng nhập hardware index' }]}
          >
            <Input type="number" placeholder="Nhập hardware index" />
          </Form.Item>

          <Form.Item label="Trạng thái" name="status" initialValue={0}>
            <Select>
              {statusOptions.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SlotManagement;
