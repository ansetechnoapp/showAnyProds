// admin.products.update.$productId.tsx
// admin.products.update.$productId.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '@remix-run/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Product } from '../../types';
import FirebaseService from "../../services/FirebaseService";

// Validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  stock: yup.number().min(0, 'Stock cannot be negative').required('Stock is required'),
  redirectUrl: yup.string().url('Invalid URL').required('Redirect URL is required'), // New field
}).required();

const AdminUpdateDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  // Form setup
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Product>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        const productRef = doc(FirebaseService.firestore, 'products', productId);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data() as Product;
          setProduct(productData);
          reset(productData); // Populate form with existing product data
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId, reset]);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    if (!productId) return;
    try {
      const productRef = doc(FirebaseService.firestore, 'products', productId);
      await updateDoc(productRef, {
        ...data,
        lastUpdated: new Date(),
      });
      alert("Product updated successfully!");
      navigate('/adminDispalayProdList');
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Product</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                {...register('price')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                {...register('category')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                {...register('stock')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Redirect URL</label>
              <input
                {...register('redirectUrl')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.redirectUrl && <p className="mt-1 text-sm text-red-600">{errors.redirectUrl.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateDetail;
