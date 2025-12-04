
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
    imageUrl: '/images/wire.jpg',
  },
  {
    id: 4,
    name: '6mm Armoured Cable',
    price: 75.20,
    imageUrl: '/images/wire.jpg',
  },
  {
    id: 5,
    name: 'Cat 6 Ethernet Cable - 50m',
    price: 25.00,
    imageUrl: '/images/wire.jpg',
  },
    {
    id: 6,
    name: 'Coaxial TV Aerial Cable',
    price: 12.75,
    imageUrl: '/images/wire.jpg',
  },
  {
    id: 7,
    name: '1.0mm Blue Insulated Wire',
    price: 18.99,
    imageUrl: '/images/wire.jpg',
  },
];
