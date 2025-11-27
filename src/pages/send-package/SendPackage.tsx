import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCreditCard,
  FaFileAlt,
  FaPaperPlane,
  FaPhoneAlt,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Grid,
  Input,
  Layout,
  Row,
  TimePicker,
  Typography,
} from 'antd';
import dayjs from 'dayjs';

import DepositModal from '@/components/deposit-modal/DepositModal';
import { LockerSelection } from '@/components/locker-flow/LockerSelection';
import OrderSummary from '@/components/locker-flow/OrderSummary';
import PaymentMethodCard from '@/components/locker-flow/PaymentMethodCard';
import { SizeSelection } from '@/components/locker-flow/SizeSelection';

import styles from './SendPackage.module.scss';
import CustomSteps from './Steps';
import { useSendPackage } from './useSendPackage';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const paymentMethods = [{ id: 'zipbox', name: 'Ví ZipBox', icon: '📦' }];

export default function SendPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  const { buildingId } = useParams<{ buildingId: string }>();
  const currentBuildingId = Number(buildingId) || 1;

  const {
    step,
    setStep,
    selectedSize,
    setSelectedSize,
    selectedLocker,
    setselectedLocker,
    duration,
    total,
    walletBalance,
    availableSizesCount,
    currentBuilding,
    selectedSizeData,
    handleTopUp,
    handleNextStep,
    handleFinalSubmit,
    formatCurrency,
    isDepositModalOpen,
    handleCloseDepositModal,
    isSubmitting,
  } = useSendPackage(currentBuildingId, form);

  const Step0Content = (
    <div className={styles.stepContent}>
      <SizeSelection
        selectedSize={selectedSize}
        onSizeChange={(sizeId) => {
          setSelectedSize(sizeId);
          setselectedLocker(null);
        }}
        availableSizesCount={availableSizesCount}
      />
      <LockerSelection
        selectedSize={selectedSize}
        selectedLocker={selectedLocker}
        onLockerSelect={setselectedLocker}
        availableSizesCount={availableSizesCount}
        lockerIds={currentBuilding?.lockers || []}
      />
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
            <Form.Item label={<Text strong>Mã đơn hàng</Text>} name="orderCode">
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
      <OrderSummary
        items={[
          { label: 'Tủ', value: selectedLocker?.code || '' },
          { label: 'Size', value: selectedSizeData?.name || '' },
          { label: 'Mã đơn hàng', value: form.getFieldValue('orderCode') || '' },
          { label: 'Đơn giá', value: `${selectedSizeData?.priceText} / giờ` },
          { label: 'Thời gian gửi', value: `${duration.toFixed(2)} giờ` },
        ]}
        total={formatCurrency(total)}
        title="Thông tin gửi hàng"
      />
      <PaymentMethodCard
        methods={paymentMethods}
        walletBalance={walletBalance}
        total={total}
        onTopUp={handleTopUp}
        formatCurrency={formatCurrency}
      />
    </div>
  );

  // --- Main Render checks ---
  if (!currentBuilding?.id) {
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

  if (!currentBuildingId) {
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
                  ({currentBuilding?.name})
                </Text>
              </Title>
            </div>
          </div>
        </Header>

        <Content className={styles.antdContent}>
          <div className={styles.maxWidthWrapper}>
            <CustomSteps step={step} screens={{ sm: screens.sm }} />

            <Form
              form={form}
              layout="vertical"
              className={styles.formContainer}
              preserve={true}
              initialValues={{}}
            >
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
                    onClick={handleFinalSubmit}
                    icon={<FaCreditCard size={screens.sm ? 20 : 16} />}
                    disabled={walletBalance < total || !selectedLocker || isSubmitting}
                    loading={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Đang xử lý...'
                      : walletBalance < total
                        ? 'Số dư không đủ'
                        : 'Thanh toán'}
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </div>
      </Layout>

      <DepositModal isOpen={isDepositModalOpen} onClose={handleCloseDepositModal} />
    </>
  );
}
