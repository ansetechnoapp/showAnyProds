import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FormFields } from '../../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FirebaseService from "../../services/FirebaseService";


const schema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.number().min(0, 'Price must be positive').required(),
  category: yup.string().required('Category is required'),
  description: yup.string().required(),
  stock: yup.number().min(0, 'Stock cannot be negative').required(),
}).required();

const AdminForm: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      price: 0,
      category: '',
      description: '',
      specifications: {},
      images: null,
      stock: 0,
    }
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const imageUrls = [];
      if (data.images) {
        for (let i = 0; i < data.images.length; i++) {
          const image = data.images[i];
          const storageRef = ref(FirebaseService.storage, `products/${image.name}`);
          await uploadBytes(storageRef, image);
          const url = await getDownloadURL(storageRef);
          imageUrls.push(url);
        }
      }

      const productData = {
        ...data,
        images: imageUrls,
        dateAdded: serverTimestamp(),
      };
      await addDoc(collection(FirebaseService.firestore, 'products'), productData);
      reset();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <label>Price</label>
        <input type="number" {...register('price')} />
        <p>{errors.price?.message}</p>
      </div>
      <div>
        <label>Category</label>
        <input {...register('category')} />
        <p>{errors.category?.message}</p>
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description')} />
        <p>{errors.description?.message}</p>
      </div>
      <div>
        <label>Stock</label>
        <input type="number" {...register('stock')} />
        <p>{errors.stock?.message}</p>
      </div>
      <div>
        <label>Specifications</label>
        <Controller
          name="specifications"
          control={control}
          render={({ field }) => (
            <textarea {...field} placeholder="Format: key=value, one per line" />
          )}
        />
      </div>
      <div>
        <label>Images</label>
        <input type="file" multiple {...register('images')} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AdminForm;
