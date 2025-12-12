import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ControlOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Card, Input, Modal, Select, message } from 'antd';

import { adminApi } from '@/api/adminApi';
import { adminBuildingsAtom, adminLockersAtom, adminSlotsAtom } from '@/recoil/atom/adminAtom';

import '../admin-buildings/BuildingManagement.css';

const RemoteControl: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<number>();
  const [selectedLocker, setSelectedLocker] = useState<number>();
  const [selectedSlot, setSelectedSlot] = useState<number>();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const setBuildings = useSetRecoilState(adminBuildingsAtom);
  const setLockers = useSetRecoilState(adminLockersAtom);
  const setSlots = useSetRecoilState(adminSlotsAtom);
  const buildings = useRecoilValue(adminBuildingsAtom);
  const lockers = useRecoilValue(adminLockersAtom);
  const slots = useRecoilValue(adminSlotsAtom);

  useEffect(() => {
    fetchBuildings();
    fetchLockers();
    fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const fetchSlots = async () => {
    try {
      const response = await adminApi.getSlots();
      setSlots(response.data);
    } catch {
      // Silent fail
    }
  };

  const handleOpenLocker = () => {
    if (!selectedSlot) {
      message.warning('Vui lòng chọn ngăn tủ');
      return;
    }

    Modal.confirm({
      title: 'Xác nhận mở tủ',
      content: 'Bạn có chắc chắn muốn mở ngăn tủ này từ xa?',
      okText: 'Mở',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          setLoading(true);
          await adminApi.openLockerRemote(selectedSlot, reason || undefined);
          message.success('Đã gửi lệnh mở tủ thành công!');
          setReason('');
        } catch {
          message.error('Không thể mở tủ');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const filteredLockers = selectedBuilding
    ? lockers.filter((l) => l.building?.id === selectedBuilding)
    : [];

  const filteredSlots = selectedLocker ? slots.filter((s) => s.locker?.id === selectedLocker) : [];

  return (
    <div className="building-management">
      <div className="page-header">
        <div>
          <h1>
            <ControlOutlined /> Điều khiển từ xa
          </h1>
          <p>Mở ngăn tủ từ xa qua MQTT</p>
        </div>
      </div>

      <Card title="Chọn ngăn tủ" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              1. Chọn tòa nhà
            </label>
            <Select
              style={{ width: '100%' }}
              placeholder="Chọn tòa nhà"
              value={selectedBuilding}
              onChange={(value) => {
                setSelectedBuilding(value);
                setSelectedLocker(undefined);
                setSelectedSlot(undefined);
              }}
              options={buildings.map((b) => ({
                label: b.name,
                value: b.id,
              }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>2. Chọn tủ</label>
            <Select
              style={{ width: '100%' }}
              placeholder="Chọn tủ"
              value={selectedLocker}
              disabled={!selectedBuilding}
              onChange={(value) => {
                setSelectedLocker(value);
                setSelectedSlot(undefined);
              }}
              options={filteredLockers.map((l) => ({
                label: `${l.code}${l.floor ? ` - Tầng ${l.floor}` : ''}`,
                value: l.id,
              }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              3. Chọn ngăn
            </label>
            <Select
              style={{ width: '100%' }}
              placeholder="Chọn ngăn"
              value={selectedSlot}
              disabled={!selectedLocker}
              onChange={setSelectedSlot}
              options={filteredSlots.map((s) => ({
                label: `${s.size} - HW Index: ${s.hw_index} - ${s.status === 0 ? 'Trống' : s.status === 1 ? 'Đang sử dụng' : 'Khóa'}`,
                value: s.id,
              }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Lý do (tùy chọn)
            </label>
            <Input.TextArea
              rows={3}
              placeholder="Nhập lý do mở tủ (để ghi log)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <Button
            type="primary"
            size="large"
            icon={<UnlockOutlined />}
            onClick={handleOpenLocker}
            loading={loading}
            disabled={!selectedSlot}
            block
          >
            Mở ngăn tủ từ xa
          </Button>
        </div>
      </Card>

      {selectedSlot && (
        <Card title="Thông tin ngăn đã chọn">
          <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 12 }}>
            <strong>Tòa nhà:</strong>
            <span>{buildings.find((b) => b.id === selectedBuilding)?.name}</span>

            <strong>Tủ:</strong>
            <span>{lockers.find((l) => l.id === selectedLocker)?.code}</span>

            <strong>Ngăn:</strong>
            <span>
              {(() => {
                const slot = slots.find((s) => s.id === selectedSlot);
                return slot ? `${slot.size} - HW Index: ${slot.hw_index}` : '';
              })()}
            </span>

            <strong>Trạng thái:</strong>
            <span>
              {(() => {
                const slot = slots.find((s) => s.id === selectedSlot);
                if (!slot) return '';
                return slot.status === 0
                  ? '🟢 Trống'
                  : slot.status === 1
                    ? '🔴 Đang sử dụng'
                    : '🟡 Khóa';
              })()}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RemoteControl;
