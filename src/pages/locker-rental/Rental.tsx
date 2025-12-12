import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaCalendarAlt, FaCreditCard, FaPaperPlane } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Grid,
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

import CustomSteps from '../send-package/Steps';
import styles from './Rental.module.scss';
import { useRental } from './useRental';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const paymentMethods = [{ id: 'zipbox', nameKey: 'wallet:payment.wallet', icon: '📦' }];

export default function RentalPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const { t } = useTranslation(['locker', 'common']);

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
  } = useRental(currentBuildingId, form);

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
            <FaCalendarAlt size={screens.sm ? 20 : 16} className={styles.sectionIcon} />{' '}
            {t('rental.selectTimeTitle')}
          </Title>
        }
        className={styles.antdCard}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<Text strong>{t('rental.endDate')}</Text>}
              name="receiveDate"
              rules={[{ required: true, message: t('rental.selectDate') }]}
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
              label={<Text strong>{t('rental.endTime')}</Text>}
              name="receiveTime"
              rules={[{ required: true, message: t('rental.selectTime') }]}
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

          <Col xs={24}>
            <Form.Item
              name="isFood"
              valuePropName="checked"
              label={<Text strong>{t('rental.itemType')}</Text>}
            >
              <Checkbox>{t('rental.foodDrink')}</Checkbox>
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
          { label: t('rental.locker'), value: selectedLocker?.code || '' },
          { label: t('rental.size'), value: selectedSizeData?.name || '' },
          {
            label: t('rental.unitPrice'),
            value: `${selectedSizeData?.priceText} / ${t('rental.perHour')}`,
          },
          {
            label: t('rental.rentalDuration'),
            value: `${duration.toFixed(2)} ${t('rental.perHour')}`,
          },
          {
            label: t('rental.itemType'),
            value: form.getFieldValue('isFood') ? t('rental.foodDrink') : t('rental.normalGoods'),
          },
        ]}
        total={formatCurrency(total)}
        title={t('rental.rentalInfo')}
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
              {t('rental.buildingNotFound')}
            </Title>
            <Text>
              {t('rental.buildingIdError')}: {currentBuildingId}
            </Text>
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
                {t('rental.title')}
              </Title>
            </div>
          </div>
        </Header>
        <Content className={styles.antdContent}>
          <div className={styles.maxWidthWrapper}>
            <Text>{t('rental.loadingBuilding')}</Text>
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
                {t('rental.title')}
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
                {t('rental.continue')}
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
                    {t('rental.back')}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" size="large" block onClick={handleNextStep}>
                    {t('rental.continue')}
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
                    {t('rental.back')}
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
                      ? t('rental.processing')
                      : walletBalance < total
                        ? t('rental.notEnoughBalance')
                        : t('rental.payment')}
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
