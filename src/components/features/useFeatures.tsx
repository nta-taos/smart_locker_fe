import { EnvironmentOutlined, ShoppingCartOutlined, UnlockOutlined } from '@ant-design/icons';

const useFeatures = () => {
  return [
    {
      image: '/images/feature-map.png',
      icon: <EnvironmentOutlined />,
      title: 'Bản đồ phân bố tủ',
      description: 'Dễ dàng tìm kiếm và lựa chọn tủ gần bạn nhất qua bản đồ trực quan.',
    },
    {
      image: '/images/feature-lock.png',
      icon: <UnlockOutlined />,
      title: 'Mở khóa tủ thông minh',
      description: 'Xác thực qua ứng dụng để mở tủ nhanh chóng và an toàn.',
    },
    {
      image: '/images/feature-order.png',
      icon: <ShoppingCartOutlined />,
      title: 'Đơn hàng của tôi',
      description: 'Quản lý toàn bộ lịch sử và trạng thái đơn hàng chỉ trong một giao diện.',
    },
  ];
};

export default useFeatures;
