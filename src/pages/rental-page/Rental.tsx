import { useRecoilValue } from 'recoil';

import { MailOutlined, PhoneOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker } from 'antd';

import { LockerInfo } from '@/components/common/locker-info/LockerInfo';
import { SlotItem } from '@/components/common/slot-item/SlotItem';
import { OrderList } from '@/components/order-list/OrderList';
import { slotListSelector } from '@/recoil/atom/locker.atom';
import { SlotType } from '@/types/slot.type';

import styles from './Rental.module.scss';
import { useRental } from './useRental';

export const RentalPage = () => {
  const {
    auth,
    isStateOne,
    setIsStateOne,
    phone,
    setPhone,
    orderCode,
    setOrderCode,
    dateTime,
    setDateTime,
    handleOrder,
    handleRent,
    buildingState,
    selectedLockerId,
    slotIds,
    slotIdSelected,
    setSlotIdSelected,
  } = useRental();

  const slotList = useRecoilValue(slotListSelector(slotIds));

  const slotMap = slotList.reduce((map, item) => {
    if (!map.has(item.size)) {
      map.set(item.size, []);
    }
    map.get(item.size)!.push(item);
    return map;
  }, new Map<number, SlotType[]>());

  const renderModal = () => {
    if (isStateOne) {
      return;
    }

    return (
      <div className={styles.modalContainer} onClick={() => setIsStateOne(true)}>
        <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
          <div className={styles.sendSection}>
            <h1>Thông tin người gửi</h1>
            <div>
              <div className={styles.icon}>
                <UserOutlined />
              </div>
              <p>Tên người dụng</p>
              <label>{auth.user?.name}</label>
              <RightOutlined />
            </div>
            <div>
              <div className={styles.icon}>
                <PhoneOutlined />
              </div>
              <p>Số điện thoại</p>
              <label>{auth.user?.phone}</label>
              <RightOutlined />
            </div>
            <div>
              <div className={styles.icon}>
                <MailOutlined />
              </div>
              <p>Email</p>
              <label>{auth.user?.email}</label>
              <RightOutlined />
            </div>
          </div>
          {auth.user?.role == 1 && (
            <div className={styles.receiveSection}>
              <h1>Thông tin người nhận</h1>
              <input
                type="text"
                placeholder="Mã đơn hàng"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button type="primary" size="large" onClick={handleOrder}>
                Xác nhận
              </Button>
            </div>
          )}
          {auth.user?.role == 0 && (
            <div className={styles.receiveSection}>
              <h1>Chọn ngày và giờ</h1>
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                placeholder="Chọn thời gian"
                value={dateTime}
                onChange={(value) => setDateTime(value)}
              />
              <Button type="primary" size="large" onClick={handleOrder}>
                Xác nhận
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <div className={styles.main}>
          <div className={styles.myInfo}>
            <h1>Thông tin của tôi</h1>
            <OrderList variant="tag" />
          </div>
          <div className={styles.slotContainer}>
            <select value={selectedLockerId} className={styles.boxOption}>
              {buildingState.lockers.map((id) => (
                <option value={id}>Tủ: {id}</option>
              ))}
            </select>
            <div className={styles.slotList}>
              <div className={styles.slotSize}>
                <h1>S</h1>
                {slotMap.get(0)?.map((sl) => (
                  <SlotItem
                    id={'S-00' + sl.id}
                    key={sl.id}
                    isSelected={sl.id == slotIdSelected}
                    status={sl.status}
                    onClick={() => {
                      setSlotIdSelected(sl.id);
                    }}
                  />
                ))}
              </div>
              <div className={styles.slotSize}>
                <h1>M</h1>
                {slotMap.get(1)?.map((sl) => (
                  <SlotItem
                    id={'M-00' + sl.id}
                    key={sl.id}
                    isSelected={sl.id == slotIdSelected}
                    status={sl.status}
                    onClick={() => {
                      setSlotIdSelected(sl.id);
                    }}
                  />
                ))}
              </div>
              <div className={styles.slotSize}>
                <h1>L</h1>
                {slotMap.get(2)?.map((sl) => (
                  <SlotItem
                    id={'L-00' + sl.id}
                    key={sl.id}
                    isSelected={sl.id == slotIdSelected}
                    status={sl.status}
                    onClick={() => {
                      setSlotIdSelected(sl.id);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className={styles.instruct}>
              <div>
                <div></div>
                <h1>Đang chọn</h1>
              </div>
              <div>
                <div></div>
                <h1>Đã được thuê</h1>
              </div>
              <div>
                <div></div>
                <h1>Còn trống</h1>
              </div>
              <div>
                <div></div>
                <h1>Đang bảo trì</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <LockerInfo
            address={buildingState.address}
            lockerId={selectedLockerId + ''}
            building={buildingState.name}
            slotId={slotIdSelected != -1 ? slotIdSelected + '' : ''}
            type="shorten"
          />
          <Button type="primary" onClick={handleRent}>
            Thuê ngay
          </Button>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};
