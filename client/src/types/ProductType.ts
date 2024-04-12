export interface ProductType {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export interface UserInitialState {
  isAuthenticate: boolean;
  currentUser: {
    username: string;
    email: string;
    profile: string;
  };
  isLoading: boolean;
}
