import { InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

export const useIntro = () => {
  const title =
    'Một chiếc tủ nhỏ nhưng mang lại trải nghiệm lớn – an toàn, nhanh chóng, tiện lợi cùng Zipbox.⚡📱📦';
  const image = '/images/intro-bg.png';
  const xName = 'Zipbox';
  const xLink = 'Zipbox';
  const igName = 'Zipbox.vn';
  const igLink = 'Zipbox';
  const socials = [
    {
      name: 'ZipBox',
      link: '/',
      icon: <TwitterOutlined />,
    },
    {
      name: 'ZipBox.vn',
      link: '/',
      icon: <InstagramOutlined />,
    },
  ];

  const startLable = 'Bắt đầu ngay';
  const startLink = '/';

  return {
    title,
    image,
    socials,
    xName,
    xLink,
    igName,
    igLink,
    startLable,
    startLink,
  };
};
