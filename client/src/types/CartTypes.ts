export interface CartType {
  category: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export interface CartInitialState {
  Carts: CartType[];
}
