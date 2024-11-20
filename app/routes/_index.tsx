import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../../types';
import FirebaseService from "../../services/FirebaseService";
import Navbar from '../components/navbar';
import { buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Button } from '../components/ui/button';
import Buy from "./buy";



export const meta: MetaFunction = () => {
  return [
    { title: "Marketplace product" },
    { name: "description", content: "All products in the marketplace" },
  ];
};

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(FirebaseService.firestore, 'products');
      const productSnapshot = await getDocs(productCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Product));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar/>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 mt-8 text-center">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          
          <div className="hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
            <div>
                    <Link 
            key={product.id}
            to={`/products/${product.id}`}
            className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300 overflow-hidden"

          >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden bg-gray-100">
              <div className="flex gap-2 p-2 overflow-x-auto">
                {product.images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`${product.name} - ${idx + 1}`}
                    className="h-32 w-32 object-cover rounded"
                  />
                ))}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
                {product.name}
              </h3>
              
              <div className="space-y-2">
                <p className="text-lg font-bold text-blue-600">
                  ${product.price}
                </p>
                
                <p className="text-sm text-gray-600">
                  <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </p>
                
                <p className="text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                
                <p className="text-sm text-gray-500">
                  Stock: <span className="font-medium">{product.stock}</span>
                </p>
              </div>
            </div>
            </Link>
            <button
                  disabled={product.stock === 0}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                    product.stock > 0
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >  
                  {product.stock > 0 ? 
                  (<Buy />) : 'Out of Stock'}
            </button>
          
          </div>
          </div>  
        ))}
        
      </div>
    </div>
  );
}