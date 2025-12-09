import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { BankOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Space, Switch, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { type Building, type CreateBuildingDto, adminApi } from '@/api/adminApi';
import { adminBuildingsAtom, adminLoadingAtom } from '@/recoil/atom/adminAtom';
import { extractErrorMessage } from '@/utils/error.utils';

import './BuildingManagement.css';

const BuildingManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);
  const [form] = Form.useForm();
  const setBuildings = useSetRecoilState(adminBuildingsAtom);
  const setLoading = useSetRecoilState(adminLoadingAtom);
  const buildings = useRecoilValue(adminBuildingsAtom);
  const loading = useRecoilValue(adminLoadingAtom);

  useEffect(() => {
    fetchBuildings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getBuildings();
      // API returns { status, message, data: Building[] }
      setBuildings(response.data);
    } catch {
      message.error('Không thể tải danh sách tòa nhà');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (building?: Building) => {
    if (building) {
      setEditingBuilding(building);
      form.setFieldsValue(building);
    } else {
      setEditingBuilding(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingBuilding(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data: CreateBuildingDto = {
        name: values.name,
        address: values.address,
        latitude: values.latitude ? parseFloat(values.latitude) : undefined,
        longitude: values.longitude ? parseFloat(values.longitude) : undefined,
        isPublic: values.isPublic ?? true,
      };

      if (editingBuilding) {
        await adminApi.updateBuilding(editingBuilding.id, data);
        message.success('Cập nhật tòa nhà thành công');
      } else {
        await adminApi.createBuilding(data);
        message.success('Tạo tòa nhà mới thành công');
      }

      handleCancel();
      fetchBuildings();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminApi.deleteBuilding(id);
      message.success('Xóa tòa nhà thành công');
      fetchBuildings();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  const columns: ColumnsType<Building> = [
    {
      title: 'Tên tòa nhà',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Vị trí',
      key: 'location',
      render: (_, record) =>
        record.latitude != null && record.longitude != null ? (
          <span>
            {Number(record.latitude).toFixed(6)}, {Number(record.longitude).toFixed(6)}
          </span>
        ) : (
          <Tag color="default">Chưa có</Tag>
        ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic) =>
        isPublic ? <Tag color="success">Công khai</Tag> : <Tag color="default">Riêng tư</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      width: 220,
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" ghost icon={<EditOutlined />} onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa tòa nhà"
            description="Bạn có chắc chắn muốn xóa tòa nhà này? Tất cả tủ và ngăn tủ sẽ bị xóa theo."
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
            <BankOutlined /> Quản lý Tòa nhà
          </h1>
          <p>Quản lý danh sách các tòa nhà trong hệ thống</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()} size="large">
          Thêm tòa nhà
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={buildings}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Tổng ${total} tòa nhà`,
        }}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingBuilding ? 'Chỉnh sửa tòa nhà' : 'Thêm tòa nhà mới'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={editingBuilding ? 'Cập nhật' : 'Tạo mới'}
        cancelText="Hủy"
        width={600}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
            label="Tên tòa nhà"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên tòa nhà' }]}
          >
            <Input placeholder="Nhập tên tòa nhà" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input.TextArea rows={2} placeholder="Nhập địa chỉ tòa nhà" />
          </Form.Item>

          <Form.Item label="Vĩ độ (Latitude)" name="latitude">
            <Input type="number" step="0.000001" placeholder="VD: 10.762622" />
          </Form.Item>

          <Form.Item label="Kinh độ (Longitude)" name="longitude">
            <Input type="number" step="0.000001" placeholder="VD: 106.660172" />
          </Form.Item>

          <Form.Item label="Công khai" name="isPublic" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Công khai" unCheckedChildren="Riêng tư" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BuildingManagement;
