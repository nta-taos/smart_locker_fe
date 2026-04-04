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
    name: 'S',
    price: 800,
    priceText: '800đ',
    dimensions: '30×30×40cm',
    description: 'Phù hợp cho túi xách, hộp nhỏ',
  },
  {
    id: 1,
    name: 'M',
    price: 1000,
    priceText: '1.000đ',
    dimensions: '40×40×40cm',
    description: 'Phù hợp cho ba lô, hộp vừa',
  },
  {
    id: 2,
    name: 'L',
    price: 1200,
    priceText: '1.200đ',
    dimensions: '50×50×40cm',
    description: 'Phù hợp cho vali, hộp lớn',
  },
  {
    id: 3,
    name: 'XL',
    price: 1900,
    priceText: '1.900đ',
    dimensions: '70×70×40cm',
    description: 'Phù hợp cho vali, hộp rất lớn',
  },
];
