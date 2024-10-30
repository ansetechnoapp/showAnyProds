import React, { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../../types';
import FirebaseService from "../../services/FirebaseService";

const ProductList: React.FC = () => {
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
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <p>Stock: {product.stock}</p>
              <div>
                {product.images.map((url, idx) => (
                  <img key={idx} src={url} alt={`${product.name} - ${idx + 1}`} width="100" />
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
