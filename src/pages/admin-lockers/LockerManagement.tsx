import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { DeleteOutlined, EditOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { type CreateLockerDto, type Locker, adminApi } from '@/api/adminApi';
import { adminBuildingsAtom, adminLoadingAtom, adminLockersAtom } from '@/recoil/atom/adminAtom';

import '../admin-buildings/BuildingManagement.css';

const LockerManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocker, setEditingLocker] = useState<Locker | null>(null);
  const [filterBuildingId, setFilterBuildingId] = useState<number>();
  const [form] = Form.useForm();
  const setLockers = useSetRecoilState(adminLockersAtom);
  const setBuildings = useSetRecoilState(adminBuildingsAtom);
  const setLoading = useSetRecoilState(adminLoadingAtom);
  const lockers = useRecoilValue(adminLockersAtom);
  const buildings = useRecoilValue(adminBuildingsAtom);
  const loading = useRecoilValue(adminLoadingAtom);

  useEffect(() => {
    fetchBuildings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchLockers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBuildingId]);

  const fetchLockers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getLockers(filterBuildingId);
      setLockers(response.data);
    } catch {
      message.error('Không thể tải danh sách tủ');
    } finally {
      setLoading(false);
    }
  };

  const fetchBuildings = async () => {
    try {
      const response = await adminApi.getBuildings();
      setBuildings(response.data);
    } catch {
      // Silent fail - buildings are optional for display
    }
  };

  const handleBuildingChange = (buildingId: number | undefined) => {
    setFilterBuildingId(buildingId);
  };

  const showModal = (locker?: Locker) => {
    if (locker) {
      setEditingLocker(locker);
      form.setFieldsValue({
        ...locker,
        buildingId: locker.building.id,
      });
    } else {
      setEditingLocker(null);
      // Pre-fill with current filter selection
      if (filterBuildingId) {
        form.setFieldsValue({
          buildingId: filterBuildingId,
        });
      } else {
        form.resetFields();
      }
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingLocker(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data: CreateLockerDto = {
        buildingId: values.buildingId,
        status: values.status ?? 1,
        floor: values.floor ? parseInt(values.floor) : undefined,
      };

      if (editingLocker) {
        await adminApi.updateLocker(editingLocker.id, data);
        message.success('Cập nhật tủ thành công');
      } else {
        await adminApi.createLocker(data);
        message.success('Tạo tủ mới thành công');
      }

      handleCancel();
      fetchLockers();
    } catch {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminApi.deleteLocker(id);
      message.success('Xóa tủ thành công');
      fetchLockers();
    } catch {
      message.error('Không thể xóa tủ');
    }
  };

  const statusOptions = [
    { value: 0, label: 'Offline', color: 'default' },
    { value: 1, label: 'Active', color: 'success' },
    { value: 2, label: 'Maintenance', color: 'warning' },
  ];

  const columns: ColumnsType<Locker> = [
    {
      title: 'Mã tủ',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Tòa nhà',
      key: 'building',
      render: (_, record) => record.building.name,
    },
    {
      title: 'Tầng',
      dataIndex: 'floor',
      key: 'floor',
      render: (floor) => floor ?? '-',
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
            title="Xóa tủ"
            description="Bạn có chắc chắn muốn xóa tủ này?"
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
            <InboxOutlined /> Quản lý Tủ khóa
          </h1>
          <p>Chọn tòa nhà để quản lý tủ khóa hoặc xem tất cả</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()} size="large">
          Thêm tủ
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%', maxWidth: 400 }}>
          <span style={{ fontWeight: 500 }}>Lọc theo tòa nhà:</span>
          <Select
            style={{ width: '100%' }}
            placeholder="Tất cả tòa nhà"
            value={filterBuildingId}
            onChange={handleBuildingChange}
            allowClear
            showSearch
            optionFilterProp="children"
          >
            {buildings.map((b) => (
              <Select.Option key={b.id} value={b.id}>
                {b.name}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={lockers}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Tổng ${total} tủ`,
        }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingLocker ? 'Chỉnh sửa tủ' : 'Thêm tủ mới'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={editingLocker ? 'Cập nhật' : 'Tạo mới'}
        cancelText="Hủy"
        width={500}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
          {editingLocker && (
            <Form.Item label="Mã tủ">
              <Input value={editingLocker.code} disabled />
              <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                Mã tủ không thể thay đổi sau khi tạo
              </div>
            </Form.Item>
          )}

          <Form.Item
            label="Tòa nhà"
            name="buildingId"
            rules={[{ required: true, message: 'Vui lòng chọn tòa nhà' }]}
          >
            <Select placeholder="Chọn tòa nhà" showSearch optionFilterProp="children">
              {buildings.map((building) => (
                <Select.Option key={building.id} value={building.id}>
                  {building.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Tầng" name="floor">
            <Input type="number" placeholder="Nhập tầng" />
          </Form.Item>

          <Form.Item label="Trạng thái" name="status" initialValue={1}>
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

export default LockerManagement;
