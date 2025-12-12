import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Col, Divider, Form, Input, Modal, Row, Typography, message } from 'antd';

import styles from './Register.module.scss';
import { useRegister } from './useRegister';

const { Text, Link, Title, Paragraph } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [popupForm] = Form.useForm<{ phone: string }>();
  const { t } = useTranslation('auth');
  const [showTerms, setShowTerms] = useState(false);

  const {
    loading,
    googleLoading,
    completeLoading,
    showPhonePopup,
    setShowPhonePopup,
    handleRegister,
    handleGoogleLogin,
    handleCompleteGoogleRegistration,
  } = useRegister();

  const onGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (idToken) {
      handleGoogleLogin(idToken);
    } else {
      message.error(t('register.googleNoInfo'));
    }
  };

  const onGoogleError = () => message.error(t('register.googleFailed'));

  const handleCancelPopup = () => {
    if (completeLoading) return;
    setShowPhonePopup(false);
    popupForm.resetFields();
  };

  // Nội dung điều khoản (Bạn có thể tách ra file riêng nếu dài)
  // Nội dung điều khoản chi tiết
  const termsContent = (
    <div style={{ height: '60vh', overflowY: 'auto', paddingRight: '12px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        {t('register.termsContent.title')}
      </Title>

      {/* 1. Quy định sử dụng tủ khóa vật lý */}
      <Title level={4}>1. Quy định sử dụng tủ khóa vật lý</Title>

      <Title level={5}>1.1. Quy định về hàng hóa</Title>
      <Paragraph>
        ZIPBOX cho phép người dùng gửi mặt hàng là thực phẩm và người gửi phải chọn{' '}
        <Text strong>“hàng gửi là thực phẩm”</Text> khi thao tác trên PWA.
      </Paragraph>
      <Paragraph>
        Đối với hàng hóa là thực phẩm, ZIPBOX chỉ nhận giữ tối đa <Text strong>24 tiếng</Text>.
        ZIPBOX sẽ kết hợp thông báo qua ứng dụng hoặc gọi điện trực tiếp nhắc khách lấy hàng liên
        tục sau mỗi 3/6/12/24 tiếng. Sau 24 tiếng, nếu không liên hệ được với người nhận hoặc đơn
        hàng thực phẩm vẫn chưa được nhận, ZIPBOX sẽ tiến hành lấy đơn ra khỏi tủ để đảm bảo vệ sinh
        cho người dùng sau.
      </Paragraph>
      <Paragraph>
        <Text strong type="danger">
          Hàng hóa bị cấm:{' '}
        </Text>
        Người dùng bị nghiêm cấm sử dụng tủ khóa ZIPBOX để lưu trữ hoặc gửi các vật phẩm thuộc danh
        mục sau: các chất nguy hiểm, dễ cháy, nổ; ma túy và các chất cấm; vũ khí, đạn dược; hàng hóa
        bất hợp pháp; động vật sống; và các vật phẩm khác bị cấm lưu hành theo quy định của pháp
        luật Việt Nam. ZIPBOX bảo lưu quyền phối hợp với các cơ quan chức năng để xử lý khi phát
        hiện vi phạm.
      </Paragraph>

      <Paragraph strong>Quy trình xử lý khi phát hiện hàng hóa vi phạm:</Paragraph>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '16px',
          fontSize: '14px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #d9d9d9', padding: '8px' }}>Giải pháp</th>
            <th style={{ border: '1px solid #d9d9d9', padding: '8px' }}>Chi tiết triển khai</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold' }}>
              Phát hiện bất thường
            </td>
            <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>
              1.1. Báo cáo từ BQL/Cư dân: Xây dựng kênh thông báo nhanh chóng (Hotline, App) để BQL
              và cư dân báo cáo các gói hàng đáng ngờ (ví dụ: mùi lạ, đóng gói bất thường, không có
              thông tin rõ ràng).
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold' }}>
              Quy trình Xử lý khẩn cấp
            </td>
            <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>
              2.1. Phong tỏa tủ: Khi phát hiện nghi vấn, BQL/Đơn vị vận hành phải khóa/phong tỏa
              ngay lập tức ô tủ đó và các ô xung quanh. Vô hiệu hóa tài khoản ngay lập tức.
              <br />
              2.2. Báo cáo Cơ quan Chức năng: Lập tức thông báo cho Cơ quan Công an/Chính quyền địa
              phương để phối hợp kiểm tra và xử lý.
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #d9d9d9', padding: '8px', fontWeight: 'bold' }}>
              Phối hợp điều tra
            </td>
            <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>
              3.1. Cung cấp dữ liệu: Cung cấp ngay lập tức dữ liệu video, thông tin định danh, lịch
              sử giao dịch cho cơ quan điều tra.
              <br />
              3.2. Bảo quản hiện trường: Giữ nguyên trạng gói hàng và hiện trường cho đến khi có sự
              chỉ đạo của cơ quan điều tra.
            </td>
          </tr>
        </tbody>
      </table>

      <Paragraph>
        Nếu có bất kỳ sự vụ liên quan đến mất mát kiện hàng của người sử dụng, sau khi kiểm tra
        camera, ZIPBOX sẽ báo lại kết quả cho người yêu cầu kiểm tra chậm nhất trong vòng{' '}
        <Text strong>72h</Text>. Nếu lỗi mất mát kiện hàng xuất phát từ ZIPBOX thì công ty sẽ chịu
        trách nhiệm về kiện hàng.
      </Paragraph>
      <Paragraph type="warning" italic>
        <Text strong>Lưu ý:</Text> ZIPBOX chỉ chịu trách nhiệm với những đơn hàng có giá trị dưới{' '}
        <Text strong>2.500.000 VND</Text> và xác minh được lỗi mất mát kiện hàng xuất phát từ
        ZIPBOX.
      </Paragraph>

      <Title level={5}>1.2. Chính sách quá hạn</Title>
      <Paragraph>
        Hệ thống sẽ tự động gửi thông báo nhắc nhở 30 phút trước khi hết thời gian thuê để người
        dùng có thể gia hạn thêm. Nếu hàng hóa không được lấy ra sau khi hết thời gian thuê đã đăng
        ký, sau <Text strong>6 giờ</Text> kể từ thời điểm quá hạn, đội ngũ vận hành ZIPBOX sẽ chủ
        động thu hồi và chuyển hàng về kho lưu trữ.
      </Paragraph>
      <Paragraph>
        Trong vòng 30 ngày, bộ phận CSKH sẽ liên hệ với khách, nếu muốn nhận lại thì khách hàng tiến
        hành xác minh danh tính và thanh toán đầy đủ phí lưu kho cố định là{' '}
        <Text strong>10.000 VND</Text> theo biểu phí của ZIPBOX. Sau 30 ngày, khách không đến nhận
        sẽ hủy hàng.
      </Paragraph>

      <Title level={5}>1.3. Chính sách Hoàn tiền và Trả hàng</Title>
      <Paragraph>
        ZIPBOX không áp dụng chính sách hoàn lại phí dịch vụ trong trường hợp người dùng lấy đồ ra
        sớm hơn thời gian đã đăng ký và thanh toán. Đối với các đơn hàng cần trả lại cho người bán,
        người dùng cần tuân theo quy trình trả hàng của người bán và sử dụng tính năng "Gửi đồ" của
        ZIPBOX như một giao dịch mới.
      </Paragraph>

      <Divider />

      {/* 2. Điều khoản Sử dụng Nền tảng PWA */}
      <Title level={4}>2. Điều khoản Sử dụng Nền tảng PWA</Title>
      <Paragraph>
        <Text strong>2.1. Tài khoản Người dùng: </Text>
        Người dùng cam kết cung cấp thông tin chính xác và cập nhật khi đăng ký tài khoản. Người
        dùng có trách nhiệm tự bảo mật mật khẩu và các thông tin xác thực của mình.
      </Paragraph>
      <Paragraph>
        <Text strong>2.2. Thanh toán: </Text>
        Mọi dịch vụ thuê tủ đều yêu cầu thanh toán trước thông qua các phương thức được tích hợp
        trên PWA. Người dùng cần nộp tối thiểu là <Text strong>10.000 VND</Text> cho mỗi lần nộp
        tiền vào ví. Phí quá hạn trong vòng 6 tiếng sẽ được tính tự động theo phí thuê ngắn hạn và
        người dùng phải hoàn tất thanh toán trước để có thể thực hiện thao tác mở tủ lấy hàng. Đối
        với hàng đem trả về kho, người dùng cần hoàn tất thủ tục xác minh danh tính và thanh toán
        đầy đủ phí lưu kho cố định là 10.000 VND.
      </Paragraph>
      <Paragraph>
        <Text strong>2.3. Trách nhiệm của Người dùng: </Text>
        Người dùng có nghĩa vụ kiểm tra và đảm bảo cửa tủ đã được đóng hoàn toàn sau khi hoàn tất
        giao dịch. ZIPBOX sẽ không chịu trách nhiệm đối với các mất mát phát sinh do cửa tủ không
        được đóng đúng cách bởi người dùng.
      </Paragraph>
      <Paragraph>
        <Text strong>2.4. Hỗ trợ kỹ thuật: </Text>
        ZIPBOX cung cấp kênh hỗ trợ khách hàng đa nền tảng, bao gồm nhân viên hỗ trợ khách hàng
        trong giờ hành chính và chatbot 24/7. Mọi sự cố phần mềm có thể được báo cáo trực tiếp thông
        qua PWA. Với những trường hợp khách có sự cố ngoài giờ hành chính thì hệ thống sẽ ghi nhận
        lại và sẽ xử lý sớm nhất.
      </Paragraph>

      <Divider />

      {/* 3. Chính sách Quyền riêng tư */}
      <Title level={4}>3. Chính sách Quyền riêng tư</Title>
      <Paragraph>
        <Text strong>3.1. Phạm vi thu thập dữ liệu: </Text>
        ZIPBOX thu thập các dữ liệu cá nhân cần thiết để cung cấp và vận hành dịch vụ, bao gồm: tên,
        số điện thoại, lịch sử giao dịch, và dữ liệu vị trí khi người dùng tìm kiếm tủ khóa.
      </Paragraph>
      <Paragraph>
        <Text strong>3.2. Mục đích sử dụng dữ liệu: </Text>
        Dữ liệu được thu thập nhằm các mục đích sau:
      </Paragraph>
      <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
        <li>Xác thực và quản lý tài khoản người dùng.</li>
        <li>Xử lý các giao dịch thanh toán.</li>
        <li>Gửi các thông báo quan trọng liên quan đến trạng thái đơn hàng và tài khoản.</li>
        <li>
          Phân tích dữ liệu vận hành (dưới dạng ẩn danh) để cải thiện chất lượng dịch vụ và tối ưu
          hóa vị trí đặt tủ.
        </li>
        <li>Cung cấp hỗ trợ khi người dùng yêu cầu.</li>
      </ul>
      <Paragraph>
        <Text strong>3.3. Cam kết bảo mật: </Text>
        ZIPBOX cam kết áp dụng các biện pháp kỹ thuật và an ninh tiên tiến để bảo vệ dữ liệu cá nhân
        của người dùng. Dữ liệu được mã hóa và truyền qua các giao thức an toàn như MQTT. Chúng tôi
        cam kết không chia sẻ, mua bán hoặc tiết lộ dữ liệu cá nhân của người dùng cho bất kỳ bên
        thứ ba nào, trừ khi có yêu cầu hợp lệ từ cơ quan nhà nước có thẩm quyền hoặc được sự đồng ý
        của người dùng.
      </Paragraph>
      <Paragraph>
        <Text strong>3.4. Quyền của người dùng: </Text>
        Người dùng có toàn quyền truy cập, chỉnh sửa thông tin cá nhân của mình, và yêu cầu xóa tài
        khoản vĩnh viễn khỏi hệ thống của ZIPBOX thông qua các kênh hỗ trợ khách hàng.
      </Paragraph>

      <br />
      <Text type="secondary" style={{ display: 'block', textAlign: 'right' }}>
        Cập nhật lần cuối: 18/11/2025
      </Text>
    </div>
  );
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <Title level={2} className={styles.registerTitle}>
          {t('register.title')}
        </Title>
        <Text type="secondary" className={styles.registerSubtitle}>
          {t('register.subtitle')}
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
          style={{ marginBottom: '1rem' }}
        >
          <Form.Item
            name="name"
            label={t('register.fullName')}
            rules={[{ required: true, message: t('register.validation.nameRequired') }]}
          >
            <Input size="large" placeholder={t('register.fullNamePlaceholder')} />
          </Form.Item>

          <Form.Item
            name="phone"
            label={t('register.phone')}
            rules={[
              { required: true, message: t('register.validation.phoneRequired') },
              { pattern: /^0\d{9}$/, message: t('register.validation.phoneInvalid') },
            ]}
          >
            <Input size="large" placeholder={t('register.phonePlaceholder')} />
          </Form.Item>

          <Form.Item
            name="email"
            label={t('register.email')}
            rules={[
              { required: true, message: t('register.validation.emailRequired') },
              { type: 'email', message: t('register.validation.emailInvalid') },
            ]}
          >
            <Input type="email" size="large" placeholder={t('register.emailPlaceholder')} />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="password"
                label={t('register.password')}
                rules={[
                  { required: true, message: t('register.validation.passwordRequired') },
                  { min: 6, message: t('register.validation.passwordMinLength') },
                ]}
                hasFeedback
              >
                <Input.Password size="large" placeholder={t('register.passwordPlaceholder')} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="repassword"
                label={t('register.rePassword')}
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: t('register.validation.rePasswordRequired') },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('register.validation.passwordMismatch')));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder={t('register.rePasswordPlaceholder')} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error(t('register.validation.termsRequired'))),
              },
            ]}
          >
            <Checkbox>
              {t('register.agreeTerms')}{' '}
              <a onClick={() => setShowTerms(true)} style={{ color: '#1677ff' }}>
                {t('register.termsText')}
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item className={styles.submitWrapper}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className={styles.submitButton}
            >
              {loading ? t('register.processing') : t('register.registerButton')}
            </Button>
          </Form.Item>

          <Divider plain style={{ color: '#999', margin: '12px 0' }}>
            {t('register.divider')}
          </Divider>

          <div className={styles.googleButtonWrapper}>
            {googleLoading ? (
              <Button size="large" block loading>
                {t('register.processing')}
              </Button>
            ) : (
              <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={onGoogleError}
                type="standard"
                theme="outline"
                size="large"
                logo_alignment="center"
                text="signup_with"
                width="100%"
              />
            )}
          </div>

          <div className={styles.registerText}>
            <Text>{t('register.haveAccount')} </Text>
            <Link href="/login">{t('register.loginNow')}</Link>
          </div>
        </Form>
      </div>

      <Modal
        title={t('register.completeTitle')}
        open={showPhonePopup}
        onCancel={handleCancelPopup}
        footer={null}
        closable={!completeLoading}
        maskClosable={!completeLoading}
      >
        <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
          {t('register.completeDescription')}
        </Text>
        <Form
          form={popupForm}
          layout="vertical"
          onFinish={handleCompleteGoogleRegistration}
          requiredMark={false}
        >
          <Form.Item
            label={t('register.phone')}
            name="phone"
            rules={[
              { required: true, message: t('register.validation.phoneRequired') },
              { pattern: /^0\d{9}$/, message: t('register.validation.phoneInvalid') },
            ]}
          >
            <Input size="large" placeholder={t('register.phonePlaceholder')} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={completeLoading}
              className={styles.submitButton}
            >
              {t('register.complete')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={showTerms}
        title={t('register.termsTitle')}
        onCancel={() => setShowTerms(false)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setShowTerms(false)}>
            {t('register.close')}
          </Button>,
          <Button
            key="agree"
            type="primary"
            onClick={() => {
              setShowTerms(false);
              form.setFieldsValue({ terms: true });
            }}
          >
            {t('register.agree')}
          </Button>,
        ]}
      >
        {termsContent}
      </Modal>
    </div>
  );
};

export default Register;
