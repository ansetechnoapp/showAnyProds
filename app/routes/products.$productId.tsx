import React, { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';
import { doc, getDoc } from 'firebase/firestore';
import { Product } from '../../types';
import FirebaseService from "../../services/FirebaseService";
import { Loader2 } from "lucide-react";
import Modal from 'react-modal'; // Import a modal component or create a custom one
import { sendEmail } from "../../services/EmailService.ts";



const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to open/close modal
  const [userInfo, setUserInfo] = useState({ name: '', email: '', address: '' }); // User info for email


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
  const handleAddToCart = () => {
    setIsModalOpen(true); // Open modal on button click
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendEmail(userInfo, product); // Send user info and product details by email
    setIsModalOpen(false);
  };
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <>
    <nav className="flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-2xl font-bold text-gray-800">Planetech sarl</h2>
      </div>
    </nav>
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
              onClick={handleAddToCart}
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
    <Footer />
      {/* Modal for User Info */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Entrer vos informations</h2>
        <form onSubmit={handleFormSubmit}>
          <label className="block mb-2">Nom:</label>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <label className="block mb-2">Addresse:</label>
          <input
            type="text"
            value={userInfo.address}
            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ProductDetail;

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div>
            <h5 className="font-bold">Contact</h5>
            <p>Email: wettecnologie1@gmail.com</p>
            <p>Téléphone: +229 98 53 52 83</p>
          </div>
          <div>
            <h5 className="font-bold">Liens utiles</h5>
            <ul className="space-y-2">
              <li><a href="/terms" className="hover:underline">Conditions d'utilisation</a></li>
              <li><a href="/privacy" className="hover:underline">Politique de confidentialité</a></li>
              <li><a href="/contact" className="hover:underline">Nous contacter</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Planeect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};