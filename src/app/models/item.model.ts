export interface Item {
  id: number;             
  title: string;           
  category: string;        
  price: number;          
  rating: number;          // 0-5
  description: string;     
  imageUrl?: string;       // optional (picsum etc)
  favorite: boolean;      
}
