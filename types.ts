export interface Product {
    id?: string;
    name: string;
    price: number;
    category: string;
    description: string;
    specifications: Record<string, string>;
    images: string[];
    stock: number;
    dateAdded: Date;
  }
  
  export interface FormFields extends Omit<Product, 'id' | 'images' | 'dateAdded'> {
    images: FileList | null;
  }
  