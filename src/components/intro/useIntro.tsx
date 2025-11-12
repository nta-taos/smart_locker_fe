import { InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

export const useIntro = () => {
  const title = 'Giải pháp giao - nhận thông minh cho cuộc sống hiện đại';
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
