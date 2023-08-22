export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  createdAt: Date,
  products: Array<{
    _id: string;
    quantity: number;
    product: {
      name: string;
      imagePath: string;
      price: number;
    }
  }>
}
