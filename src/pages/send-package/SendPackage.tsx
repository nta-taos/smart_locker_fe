import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

import styles from './SendPackage.module.scss';
import CustomSteps from './Steps';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface Locker {
  id: string;
  size: 'S' | 'M' | 'L';
  status: 'available' | 'occupied';
  floor: number;
}

const mockLockers: Locker[] = [
  { id: 'A01', size: 'S', status: 'available', floor: 1 },
  { id: 'A02', size: 'S', status: 'available', floor: 1 },
  { id: 'A03', size: 'M', status: 'occupied', floor: 1 },
  { id: 'A04', size: 'M', status: 'available', floor: 1 },
  { id: 'A05', size: 'L', status: 'available', floor: 1 },
  { id: 'B01', size: 'S', status: 'available', floor: 2 },
  { id: 'B02', size: 'M', status: 'available', floor: 2 },
  { id: 'B03', size: 'L', status: 'occupied', floor: 2 },
  { id: 'B04', size: 'S', status: 'available', floor: 2 },
  { id: 'B05', size: 'M', status: 'available', floor: 2 },
  { id: 'B06', size: 'L', status: 'available', floor: 2 },
  { id: 'C01', size: 'S', status: 'available', floor: 3 },
];

interface SizeOption {
  id: 'S' | 'M' | 'L';
  name: string;
  price: number;
  priceText: string;
  dimensions: string;
  description: string;
}

const sizes: SizeOption[] = [
  {
    id: 'S',
    name: 'Nhỏ',
    price: 400,
    priceText: '400đ',
    dimensions: '30×30×30cm',
    description: 'Phù hợp cho túi xách, hộp nhỏ',
  },
  {
    id: 'M',
    name: 'Trung bình',
    price: 600,
    priceText: '600đ',
    dimensions: '40×40×40cm',
    description: 'Phù hợp cho ba lô, hộp vừa',
  },
  {
    id: 'L',
    name: 'Lớn',
    price: 800,
    priceText: '800đ',
    dimensions: '50×50×50cm',
    description: 'Phù hợp cho vali, hộp lớn',
  },
];

const paymentMethods = [{ id: 'zipbox', name: 'Ví ZipBox', icon: '📦' }];

// --- COMPONENT CHÍNH ---
export default function SendPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const [selectedSize, setSelectedSize] = useState<SizeOption['id']>('M');
  const [selectedLocker, setSelectedLocker] = useState<string | null>(null);
  const [duration, setDuration] = useState(1);

  const [walletBalance] = useState(150000);

  const handleTopUp = () => {
    toast.info('Đang chuyển đến cổng nạp tiền PayOS...');
  };

  const availableLockers = mockLockers.filter(
    (locker) => locker.size === selectedSize && locker.status === 'available',
  );
  const selectedSizeData = sizes.find((s) => s.id === selectedSize);

  const rawTotal = (selectedSizeData?.price || 0) * duration;
  const total = Math.round(rawTotal / 1000) * 1000;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleSubmit = () => {
    toast.success(`Đã thanh toán ${formatCurrency(total)} bằng Ví ZipBox cho đơn gửi hàng!`, {
      position: 'top-right',
      autoClose: 5000,
    });
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      if (step === 0 && selectedLocker) {
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

        const finalDuration = Math.max(1, diffInHoursFloat);

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

  // --- Step Content Components ---
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
            setSelectedLocker(null);
          }}
          value={selectedSize}
          className={styles.fullWidthGroup}
        >
          <div className={styles.sizeOptionsContainer}>
            {sizes.map((size) => (
              <Radio.Button
                key={size.id}
                value={size.id}
                className={selectedSize === size.id ? styles.sizeRadioSelected : styles.sizeRadio}
              >
                <div className={styles.sizeRadioContent}>
                  <div className={styles.sizeRadioText}>
                    <Text strong className={styles.sizeTitle}>
                      Size {size.name}
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
            ))}
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
            <span className={styles.availableLockerTag}>{availableLockers.length} tủ khả dụng</span>
          </div>
        }
        className={styles.antdCard}
      >
        {availableLockers.length > 0 ? (
          <Row gutter={[12, 12]} className={styles.lockerGrid}>
            {availableLockers.map((locker) => (
              <Col xs={8} sm={6} md={4} key={locker.id}>
                <div
                  className={`${styles.lockerBox} ${selectedLocker === locker.id ? styles.lockerBoxSelected : styles.lockerBoxDefault}`}
                  onClick={() => setSelectedLocker(locker.id)}
                >
                  <Text className={styles.lockerId}>{locker.id}</Text> <br />
                  <Text className={styles.lockerFloor}>Tầng {locker.floor}</Text>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className={styles.noLocker}>
            <FaLock size={48} className={styles.noLockerIcon} />
            <Text type="secondary" className={styles.noLockerText}>
              Không có tủ size {selectedSize} khả dụng
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
              <Text strong>{selectedLocker}</Text>
            </Col>
          </Row>
          <Row className={styles.summaryRow}>
            <Col span={12}>
              <Text type="secondary">Size:</Text>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>{selectedSize}</Text>
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
                {/* --- 1. Thông tin ví (Trái) --- */}
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
                        // Áp dụng class động cho màu số dư
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

                {/* --- 2. Nút Nạp tiền (Phải) --- */}
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
              disabled={!selectedLocker}
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
                >
                  Thanh toán
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </Layout>
  );
}
