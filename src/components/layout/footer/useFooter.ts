export const useFooter = () => {
  const year = new Date().getFullYear();

  //   const socials = [
  //     { icon: <FaTiktok />, href: "#" },
  //     { icon: <FaFacebook />, href: "#" },
  //     { icon: <FaInstagram />, href: "#" },
  //     { icon: <FaYoutube />, href: "#" },
  //   ];

  const products = ['Tủ bảo mật', 'Khóa thông minh'];

  const supports = ['Hướng dẫn cài đặt', 'Bảo hành & Sửa chữa', 'Chính sách & Điều khoản', 'FAQ'];

  const contacts = [
    '1900 1001 (24/7)',
    'support@zipboxvn.com',
    '36/7 Kẹt Sắt, Hòa Khánh Nam, TP. Đà Nẵng',
    'T2-T7: 8:00 - 18:00',
    'CN: 9:00 - 17:00',
  ];

  return { year, products, supports, contacts };
};
