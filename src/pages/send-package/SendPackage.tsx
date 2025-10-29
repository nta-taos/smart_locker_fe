import { useCallback, useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaBox,
  FaCalendarAlt,
  FaCreditCard,
  FaFileAlt,
  FaLock,
  FaPaperPlane,
  FaPhoneAlt,
  FaPlus,
  FaWallet,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Grid,
  Input,
  Layout,
  Radio,
  Row,
  TimePicker,
  Typography,
} from 'antd';
import dayjs from 'dayjs';

import { buildingApi } from '@/api/buildingApi';
import { authState } from '@/recoil/atom/authAtom';
import {
  buildingAtom,
  buildingIdsAtom,
  slotCountBySizeSelector,
} from '@/recoil/atom/building.atom';
import { lockerAtom } from '@/recoil/atom/locker.atom';
import { slotAtom } from '@/recoil/atom/slot.atom';
import { BuildingResponeType } from '@/types/building.type';

import styles from './SendPackage.module.scss';
import CustomSteps from './Steps';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const sizeOptions = [
  {
    id: 0,
    name: 'Nhỏ',
    price: 400,
    priceText: '400đ',
    dimensions: '30×30×30cm',
    description: 'Phù hợp cho túi xách, hộp nhỏ',
  },
  {
    id: 1,
    name: 'Trung bình',
    price: 600,
    priceText: '600đ',
    dimensions: '40×40×40cm',
    description: 'Phù hợp cho ba lô, hộp vừa',
  },
  {
    id: 2,
    name: 'Lớn',
    price: 800,
    priceText: '800đ',
    dimensions: '50×50×50cm',
    description: 'Phù hợp cho vali, hộp lớn',
  },
];

const paymentMethods = [{ id: 'zipbox', name: 'Ví ZipBox', icon: '📦' }];

export default function SendPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const { buildingId } = useParams<{ buildingId: string }>();
  const currentBuildingId = Number(buildingId) || 1;

  const [buildingIds] = useRecoilState(buildingIdsAtom);

  const populateRecoilState = useRecoilCallback(
    ({ set }) =>
      (buildings: BuildingResponeType[]) => {
        const allBuildingIds: number[] = [];
        if (!buildings || buildings.length === 0) return;

        buildings.forEach((bd) => {
          allBuildingIds.push(bd.id);
          const lockerIds: number[] = [];

          bd.lockers.forEach((lk) => {
            lockerIds.push(lk.id);
            const slotIds: number[] = [];

            lk.slots.forEach((sl) => {
              slotIds.push(sl.id);
              set(slotAtom(sl.id), sl);
            });

            set(lockerAtom(lk.id), {
              ...lk,
              slots: slotIds,
            });
          });

          set(buildingAtom(bd.id), {
            ...bd,
            lockers: lockerIds,
          });
        });

        set(buildingIdsAtom, allBuildingIds);
      },
    [],
  );

  const getBuildings = useCallback(async () => {
    try {
      const res = await buildingApi.getBuildings();
      const result: BuildingResponeType[] = res.data.data;
      populateRecoilState(result);
    } catch (error) {
      console.log(error);
      toast.error('Lỗi khi tải dữ liệu toà nhà.');
    }
  }, [populateRecoilState]);

  useEffect(() => {
    if (buildingIds.length === 0) {
      getBuildings();
    }
  }, [buildingIds.length, getBuildings]);

  const [step, setStep] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(1);
  const [selectedSlot, setSelectedSlot] = useState<{ id: number; code: string } | null>(null);
  const [duration, setDuration] = useState(1);
  const auth = useRecoilValue(authState);
  const [walletBalance] = useState(Number(auth.user?.wallet.balance));

  const availableSizesCount = useRecoilValue(slotCountBySizeSelector(currentBuildingId));
  const currentBuilding = useRecoilValue(buildingAtom(currentBuildingId));

  const selectedSizeData = sizeOptions.find((s) => s.id === selectedSize);
  const rawTotal = (selectedSizeData?.price || 0) * duration;
  const total = rawTotal;

  const handleTopUp = () => {
    toast.info('Đang chuyển đến cổng nạp tiền PayOS...');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleSubmit = () => {
    toast.success(
      `Đã thanh toán ${formatCurrency(total)} bằng Ví ZipBox cho tủ ${selectedSlot?.code}!`,
      {
        position: 'top-right',
        autoClose: 5000,
      },
    );
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      if (step === 0 && selectedSlot) {
        setStep(1);
      } else if (
        step === 1 &&
        values.receiveDate &&
        values.receiveTime &&
        values.phoneNumber &&
        values.orderCode
      ) {
        const { receiveDate, receiveTime } = values;
        const combinedReceiveDateTime = receiveDate
          .hour(receiveTime.hour())
          .minute(receiveTime.minute())
          .second(0);
        const now = dayjs();
        const diffInHoursFloat = combinedReceiveDateTime.diff(now, 'hour', true);
        const finalDuration = diffInHoursFloat;

        if (finalDuration < 1) {
          toast.error('Thời gian nhận hàng phải tối thiểu sau 1 giờ kể từ hiện tại.', {
            position: 'top-right',
            autoClose: 3000,
          });
          return;
        }

        setDuration(finalDuration);
        setStep(2);
      } else {
        toast.error('Vui lòng điền đủ thông tin bắt buộc và chọn tủ.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch {
      toast.error('Vui lòng điền đủ thông tin bắt buộc.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const SlotItem = ({
    slotId,
    lockerCode,
    lockerFloor,
  }: {
    slotId: number;
    lockerCode: string;
    lockerFloor: string | null;
  }) => {
    const slot = useRecoilValue(slotAtom(slotId));

    if (slot.size !== selectedSize || slot.status !== 0) {
      return null;
    }

    const slotCode = `${lockerCode}`;

    return (
      <Col xs={8} sm={6} md={4} key={slot.id}>
        <div
          className={`${styles.lockerBox} ${
            selectedSlot?.id === slot.id ? styles.lockerBoxSelected : styles.lockerBoxDefault
          }`}
          onClick={() => setSelectedSlot({ id: slot.id, code: slotCode })}
        >
          <Text className={styles.lockerId}>{slotCode}</Text> <br />
          {lockerFloor && <Text className={styles.lockerFloor}>Tầng {lockerFloor}</Text>}
        </div>
      </Col>
    );
  };

  const LockerGroup = ({ lockerId }: { lockerId: number }) => {
    const locker = useRecoilValue(lockerAtom(lockerId));
    if (!locker || !locker.slots) return null;

    return (
      <>
        {locker.slots.map((slotId) => (
          <SlotItem
            key={slotId}
            slotId={slotId}
            lockerCode={locker.code}
            lockerFloor={locker.floor !== null ? String(locker.floor) : null}
          />
        ))}
      </>
    );
  };

  const Step0Content = (
    <div className={styles.stepContent}>
      {/* Size Selection */}
      <Card
        title={
          <Title level={4} className={styles.sectionTitle}>
            <FaBox size={screens.sm ? 20 : 16} className={styles.sectionIcon} /> Chọn kích thước tủ
          </Title>
        }
        className={styles.antdCard}
      >
        <Radio.Group
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setSelectedSlot(null);
          }}
          value={selectedSize}
          className={styles.fullWidthGroup}
        >
          <div className={styles.sizeOptionsContainer}>
            {sizeOptions.map((size) => {
              const count = availableSizesCount[size.id] || 0;
              const isAvailable = count > 0;

              return (
                <Radio.Button
                  key={size.id}
                  value={size.id}
                  className={selectedSize === size.id ? styles.sizeRadioSelected : styles.sizeRadio}
                  disabled={!isAvailable}
                >
                  <div className={styles.sizeRadioContent}>
                    <div className={styles.sizeRadioText}>
                      <Text strong className={styles.sizeTitle}>
                        Size {size.name}{' '}
                        <Text
                          type={isAvailable ? 'secondary' : 'danger'}
                          className={styles.sizeCount}
                        >
                          ({count})
                        </Text>
                      </Text>
                      <span className={styles.dimensionTag}>{size.dimensions}</span>
                    </div>
                    <Text type="secondary" className={styles.sizeDescription}>
                      {size.description}
                    </Text>
                    <div className={styles.priceTag}>
                      <Text className={styles.priceAmount}>{size.priceText}</Text>
                      <Text type="secondary">/giờ</Text>
                    </div>
                  </div>
                </Radio.Button>
              );
            })}
          </div>
        </Radio.Group>
      </Card>

      {/* Locker Selection */}
      <Card
        title={
          <div className={styles.sectionHeader}>
            <Title level={4} className={styles.sectionTitle}>
              <FaLock size={screens.sm ? 20 : 16} className={styles.sectionIcon} /> Chọn tủ cụ thể
            </Title>
            <span className={styles.availableLockerTag}>
              {availableSizesCount[selectedSize] || 0} tủ khả dụng
            </span>
          </div>
        }
        className={styles.antdCard}
      >
        {(availableSizesCount[selectedSize] || 0) > 0 ? (
          <Row gutter={[12, 12]} className={styles.lockerGrid}>
            {currentBuilding.lockers.map((lockerId) => (
              <LockerGroup key={lockerId} lockerId={lockerId} />
            ))}
          </Row>
        ) : (
          <div className={styles.noLocker}>
            <FaLock size={48} className={styles.noLockerIcon} />
            <Text type="secondary" className={styles.noLockerText}>
              Không có tủ size {sizeOptions.find((s) => s.id === selectedSize)?.name} khả dụng
            </Text>
            <Text type="secondary" className={styles.noLockerSubText}>
              Vui lòng chọn size khác
            </Text>
          </div>
        )}
      </Card>
    </div>
  );

  const Step1Content = (
    <div className={styles.stepContent}>
      {/* Date & Time Selection */}
      <Card
        title={
          <Title level={4} className={styles.sectionTitle}>
            <FaCalendarAlt size={screens.sm ? 20 : 16} className={styles.sectionIcon} /> Chọn thời
            gian nhận hàng
          </Title>
        }
        className={styles.antdCard}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<Text strong>Ngày nhận hàng</Text>}
              name="receiveDate"
              rules={[{ required: true, message: 'Vui lòng chọn ngày nhận hàng!' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={<Text strong>Giờ & Phút nhận hàng</Text>}
              name="receiveTime"
              rules={[{ required: true, message: 'Vui lòng chọn giờ nhận hàng!' }]}
            >
              <TimePicker
                style={{ width: '100%' }}
                format="HH:mm"
                minuteStep={5}
                disabledTime={() => {
                  const selectedDate = form.getFieldValue('receiveDate');
                  const now = dayjs();

                  if (!selectedDate) {
                    return {};
                  }

                  if (selectedDate.isSame(now, 'day')) {
                    return {
                      disabledHours: () => Array.from({ length: now.hour() }, (_, i) => i),
                      disabledMinutes: (hour: number) => {
                        if (hour === now.hour()) {
                          const currentMinute = now.minute();
                          const nextValidMinute = Math.ceil(currentMinute / 5) * 5;
                          return Array.from({ length: nextValidMinute }, (_, i) => i);
                        }
                        return [];
                      },
                    };
                  }

                  return {};
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Recipient Info */}
      <Card
        title={
          <Title level={4} className={styles.sectionTitle}>
            <FaPhoneAlt size={screens.sm ? 20 : 16} className={styles.sectionIconOrange} /> Thông
            tin người nhận
          </Title>
        }
        className={styles.antdCard}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<Text strong>Số điện thoại</Text>}
              name="phoneNumber"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input
                prefix={<FaPhoneAlt size={16} />}
                placeholder="Nhập số điện thoại"
                className={styles.antInput}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<Text strong>Mã đơn hàng</Text>}
              name="orderCode"
              rules={[{ required: true, message: 'Vui lòng nhập mã đơn hàng!' }]}
            >
              <Input
                prefix={<FaFileAlt size={16} />}
                placeholder="Nhập mã đơn hàng"
                className={styles.antInput}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </div>
  );

  const Step2Content = (
    <div className={styles.stepContent}>
      {/* Order Summary */}
      <Card
        title={
          <Title level={4} className={styles.sectionTitle}>
            <FaBox size={screens.sm ? 20 : 16} className={styles.sectionIcon} /> Thông tin gửi hàng
          </Title>
        }
        className={`${styles.antdCard} ${styles.summaryCard}`}
      >
        <div className={styles.summaryList}>
          <Row className={styles.summaryRow}>
            <Col span={12}>
              <Text type="secondary">Tủ:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>{selectedSlot?.code}</Text>
            </Col>
          </Row>
          <Row className={styles.summaryRow}>
            <Col span={12}>
              <Text type="secondary">Size:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>{selectedSizeData?.name}</Text>
            </Col>
          </Row>
          <Row className={styles.summaryRow}>
            <Col span={12}>
              <Text type="secondary">Mã đơn hàng:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>{form.getFieldValue('orderCode')}</Text>
            </Col>
          </Row>

          <Row className={styles.summaryRow}>
            <Col span={12}>
              <Text type="secondary">Đơn giá:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong className={styles.priceTextSmall}>
                {selectedSizeData?.priceText} / giờ
              </Text>
            </Col>
          </Row>
          <Row className={styles.summaryRow}>
            <Col span={12}>
              <Text type="secondary">Thời gian gửi:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>{duration.toFixed(2)} giờ</Text>
            </Col>
          </Row>
        </div>
        <div className={styles.totalRowAntd}>
          <Row align="middle">
            <Col span={12}>
              <Text strong className={styles.totalLabel}>
                Tổng cộng:
              </Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong className={styles.totalAmount}>
                {formatCurrency(total)}
              </Text>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Payment Method Selection */}
      <Card
        title={
          <Title level={4} className={styles.sectionTitle}>
            <FaWallet size={screens.sm ? 20 : 16} className={styles.sectionIconOrange} /> Phương
            thức thanh toán
          </Title>
        }
        className={styles.antdCard}
      >
        <div className={styles.paymentMethodContainer}>
          {paymentMethods.map((method) => {
            const hasEnoughBalance = walletBalance >= total;

            return (
              <div key={method.id} className={styles.walletCard}>
                <div className={styles.walletInfo}>
                  <Text className={styles.walletIcon}>{method.icon}</Text>
                  <div className={styles.walletDetails}>
                    <Text strong className={styles.walletName}>
                      {method.name}
                    </Text>
                    <div className={styles.walletBalance}>
                      <Text type="secondary" className={styles.walletBalanceLabel}>
                        Số dư:
                      </Text>
                      <Text
                        strong
                        className={`${styles.walletBalanceAmount} ${
                          hasEnoughBalance
                            ? styles['walletBalanceAmount--sufficient']
                            : styles['walletBalanceAmount--insufficient']
                        }`}
                      >
                        {formatCurrency(walletBalance)}
                      </Text>
                    </div>
                  </div>
                </div>
                <Button
                  icon={<FaPlus className={styles.topUpIcon} />}
                  onClick={handleTopUp}
                  size="middle"
                >
                  Nạp tiền
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  // --- Main Render (Giữ nguyên) ---

  if (!currentBuilding.id && buildingIds.length > 0) {
    return (
      <Layout className={styles.antdLayout}>
        <Header className={styles.antdHeader}>
          <div className={styles.headerContent}>
            <Button
              type="text"
              icon={<FaArrowLeft size={screens.sm ? 24 : 20} />}
              className={styles.backButtonAntd}
              onClick={() => navigate(-1)}
            />
          </div>
        </Header>
        <Content className={styles.antdContent}>
          <div className={styles.maxWidthWrapper}>
            <Title level={3} type="danger">
              Không tìm thấy toà nhà
            </Title>
            <Text>Không tìm thấy toà nhà với ID: {currentBuildingId}</Text>
          </div>
        </Content>
      </Layout>
    );
  }

  // Trạng thái đang tải
  if (buildingIds.length === 0) {
    return (
      <Layout className={styles.antdLayout}>
        <Header className={styles.antdHeader}>
          <div className={styles.headerContent}>
            <Button
              type="text"
              icon={<FaArrowLeft size={screens.sm ? 24 : 20} />}
              className={styles.backButtonAntd}
              onClick={() => navigate(-1)}
            />
            <div className={styles.headerTitleGroup}>
              <div className={styles.headerIconWrapper}>
                <FaPaperPlane className={styles.headerIcon} size={screens.sm ? 24 : 20} />
              </div>
              <Title level={2} className={styles.pageTitle}>
                Gửi hàng
              </Title>
            </div>
          </div>
        </Header>
        <Content className={styles.antdContent}>
          <div className={styles.maxWidthWrapper}>
            <Text>Đang tải dữ liệu toà nhà...</Text>
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <>
      <Layout className={styles.antdLayout}>
        <Header className={styles.antdHeader}>
          <div className={styles.headerContent}>
            <Button
              type="text"
              icon={<FaArrowLeft size={screens.sm ? 24 : 20} />}
              className={styles.backButtonAntd}
              onClick={() => navigate(-1)}
            />
            <div className={styles.headerTitleGroup}>
              <div className={styles.headerIconWrapper}>
                <FaPaperPlane className={styles.headerIcon} size={screens.sm ? 24 : 20} />
              </div>
              <Title level={2} className={styles.pageTitle}>
                Gửi hàng
                <Text
                  type="secondary"
                  style={{ fontSize: '1rem', marginLeft: 10, fontWeight: 400 }}
                >
                  ({currentBuilding.name})
                </Text>
              </Title>
            </div>
          </div>
        </Header>

        <Content className={styles.antdContent}>
          <div className={styles.maxWidthWrapper}>
            <CustomSteps step={step} screens={{ sm: screens.sm }} />

            <Form form={form} layout="vertical" className={styles.formContainer} initialValues={{}}>
              {step === 0 && Step0Content}
              {step === 1 && Step1Content}
              {step === 2 && Step2Content}
            </Form>
          </div>
        </Content>

        <div className={styles.fixedBottomBar}>
          <div className={styles.maxWidthWrapper}>
            {step === 0 && (
              <Button
                type="primary"
                size="large"
                block
                onClick={handleNextStep}
                disabled={!selectedSlot}
              >
                Tiếp tục
              </Button>
            )}

            {step === 1 && (
              <Row gutter={16}>
                <Col span={12}>
                  <Button
                    size="large"
                    block
                    onClick={() => setStep(0)}
                    className={styles.antdSecondaryButton}
                  >
                    Quay lại
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" size="large" block onClick={handleNextStep}>
                    Tiếp tục
                  </Button>
                </Col>
              </Row>
            )}

            {step === 2 && (
              <Row gutter={16}>
                <Col span={12}>
                  <Button
                    size="large"
                    block
                    onClick={() => setStep(1)}
                    className={styles.antdSecondaryButton}
                  >
                    Quay lại
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={handleSubmit}
                    icon={<FaCreditCard size={screens.sm ? 20 : 16} />}
                    disabled={walletBalance < total}
                  >
                    {walletBalance < total ? 'Số dư không đủ' : 'Thanh toán'}
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </div>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
