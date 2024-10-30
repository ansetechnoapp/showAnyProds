import React, { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';
import { doc, getDoc } from 'firebase/firestore';
import { Product } from '../../types';
import FirebaseService from "../../services/FirebaseService";
import { Loader2 } from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const productRef = doc(FirebaseService.firestore, 'products', productId);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          const productData = { 
            id: productSnapshot.id, 
            ...productSnapshot.data() 
          } as Product;
          setProduct(productData);
          setSelectedImage(productData.images[0]);
        } else {
          console.error('Product not found');
        }
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery Section */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(url)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === url ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <img
                  src={url}
                  alt={`${product.name} - ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600">
              ${product.price.toLocaleString()}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-sm font-medium bg-gray-100 rounded-full">
                {product.category}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            <div className="prose prose-sm">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="pt-6">
              <button
                disabled={product.stock === 0}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                  product.stock > 0
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;