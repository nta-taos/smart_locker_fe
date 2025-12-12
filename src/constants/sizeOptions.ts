export type SizeOption = {
  id: number;
  name: string;
  nameKey: string; // Translation key for size name
  price: number;
  priceText: string;
  dimensions: string;
  descriptionKey: string; // Translation key for description
};

export const sizeOptions: SizeOption[] = [
  {
    id: 0,
    name: 'S',
    nameKey: 'locker:sizes.s',
    price: 800,
    priceText: '800đ',
    dimensions: '30×30×40cm',
    descriptionKey: 'locker:sizeDescriptions.s',
  },
  {
    id: 1,
    name: 'M',
    nameKey: 'locker:sizes.m',
    price: 1000,
    priceText: '1.000đ',
    dimensions: '40×40×40cm',
    descriptionKey: 'locker:sizeDescriptions.m',
  },
  {
    id: 2,
    name: 'L',
    nameKey: 'locker:sizes.l',
    price: 1200,
    priceText: '1.200đ',
    dimensions: '50×50×40cm',
    descriptionKey: 'locker:sizeDescriptions.l',
  },
  {
    id: 3,
    name: 'XL',
    nameKey: 'locker:sizes.xl',
    price: 1900,
    priceText: '1.900đ',
    dimensions: '70×70×40cm',
    descriptionKey: 'locker:sizeDescriptions.xl',
  },
];
