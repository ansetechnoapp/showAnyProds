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
    isTrending:boolean;
  }
  
  export interface FormFields extends Omit<Product, 'id' | 'images' | 'dateAdded'> {
    images: FileList | null;
  }
  
  export const PRODUCT_CATEGORIES = [
    {
      boutique : 'Boutique',
      feature:
      [ 
        {
            name:'Fruits',
            href:'#',
        },
        {
          name:'Cable Aluminium',
          href:'#',
        },
        {
          name:'Cable de Cuivre',
          href:'#',
        },
        {
          name:'Imprimante',
          href:'#',
      },{
          name:'Régulateur',
          href:'#',
        },
        {
          name:'Onduleur',
          href:'#',
        }
        ]
        
        }
  ]
    
        
        
    
        
       
    
