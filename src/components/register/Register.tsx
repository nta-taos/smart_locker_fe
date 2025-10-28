import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { GoogleOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, message } from 'antd';

import { authApi } from '@/api/authApi';
import { authState } from '@/recoil/atom/authAtom';
import { AuthType } from '@/types/auth.type';

import styles from './Register.module.scss';

const Register: React.FC = () => {
  const [form]: [FormInstance] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, setAuth] = useRecoilState(authState);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await authApi.register(values.name, values.phone, values.email, values.password);
      const { token, user } = res.data.data;

      const newAuth: AuthType = {
        isAuthenticated: true,
        token,
        user,
      };

      setAuth(newAuth);
      localStorage.setItem('auth', JSON.stringify(newAuth));

      message.success('Đăng ký và đăng nhập thành công!');
      navigate('/dashboard');
    } catch {
      message.error('Đăng ký thất bại, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} className={styles.loginContainer} layout="vertical" onFinish={onFinish}>
      <h1 className={styles.loginTitle}>Đăng ký</h1>

      <Form.Item
        name="name"
        label="Họ và tên"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        style={{ width: '100%' }}
      >
        <Input size="large" tabIndex={1} placeholder="Nhập họ và tên" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại!' },
          { pattern: /^\d{10}$/, message: 'Số điện thoại phải có đúng 10 số!' },
        ]}
        style={{ width: '100%' }}
      >
        <Input type="text" tabIndex={1} size="large" placeholder="Nhập số điện thoại" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Email không đúng định dạng!' },
        ]}
        style={{ width: '100%' }}
      >
        <Input type="email" tabIndex={1} size="large" placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
        ]}
        style={{ width: '100%' }}
        hasFeedback
      >
        <Input.Password tabIndex={2} size="large" placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item
        name="repassword"
        label="Nhập lại mật khẩu"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Hai mật khẩu không khớp!'));
            },
          }),
        ]}
        style={{ width: '100%' }}
      >
        <Input.Password size="large" tabIndex={2} placeholder="Nhập lại mật khẩu" />
      </Form.Item>

      <Button
        tabIndex={3}
        size="large"
        type="primary"
        htmlType="submit"
        loading={loading}
        style={{ width: '100%' }}
      >
        {loading ? 'Đang xử lý...' : 'Đăng ký'}
      </Button>

      <p>Hoặc</p>

      <Button
        className={styles.loginWithGoogleButton}
        icon={<GoogleOutlined />}
        size="large"
        style={{ width: '100%' }}
      >
        Đăng nhập với Google
      </Button>

      <p>
        Bạn đã có tài khoản ? <a href="/login">Đăng nhập ngay</a>
      </p>

      <div className={styles.circleContainer}>
        <div className={styles.circle}></div>
        <div className={styles.border1}></div>
        <div className={styles.border2}></div>
        <div className={styles.border3}></div>
      </div>
    </Form>
  );
};

export default Register;
