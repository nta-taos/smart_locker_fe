export type SizeOption = {
  id: number;
  name: string;
  price: number;
  priceText: string;
  dimensions: string;
  description: string;
};

export const sizeOptions: SizeOption[] = [
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
