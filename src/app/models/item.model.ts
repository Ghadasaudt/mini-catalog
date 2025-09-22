export interface Item {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  imageUrl?: string;
  favorite: boolean;
}
