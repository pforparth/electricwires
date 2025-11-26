
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: '1.5mm 1 Core PVC Insulated Wire',
    price: 15.99,
    imageUrl: '/images/wire1.jpg',
  },
  {
    id: 2,
    name: '2.5mm 3 Core Flexible Cable',
    price: 32.50,
    imageUrl: '/images/wire2.jpg',
  },
  {
    id: 3,
    name: '4mm Twin and Earth Cable',
    price: 45.00,
    imageUrl: '/images/wire3.jpg',
  },
  {
    id: 4,
    name: '6mm Armoured Cable',
    price: 75.20,
    imageUrl: '/images/wire4.jpg',
  },
  {
    id: 5,
    name: 'Cat 6 Ethernet Cable - 50m',
    price: 25.00,
    imageUrl: '/images/wire5.jpg',
  },
    {
    id: 6,
    name: 'Coaxial TV Aerial Cable',
    price: 12.75,
    imageUrl: '/images/wire6.jpg',
  },
];
