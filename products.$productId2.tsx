import React, { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';
import { doc, getDoc } from 'firebase/firestore';
import { Product } from '../../types';
import FirebaseService from "../../services/FirebaseService";
import { collection, getDocs } from 'firebase/firestore';
import { Link } from '@remix-run/react';
import { Loader2 } from "lucide-react";
import Modal from 'react-modal';
import Navbar from '../components/navbar';
import { sendEmail } from "../../services/EmailService.ts";
import Buy from './buy';



const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', address: '' });
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null); // State for redirect URL
  const isTrending = true;



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
          setRedirectUrl(productData.redirectUrl || null); // Assuming redirectUrl is a field in product data
        } else {
          console.error('Product not found');
        }
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (redirectUrl) {
      // const interval = setInterval(() => {
      //   window.location.href = redirectUrl; // Redirection vers l'URL
      // }, 1000); // 1 seconde
       setInterval(() => {
        window.location.href = redirectUrl; // Redirection vers l'URL
      }, 1000); // 1 seconde

      // Optionnel : redirection immédiate la première fois
      window.location.href = redirectUrl;

      // return () => clearInterval(interval); // Nettoyage de l'intervalle au démontage
    }
  }, [redirectUrl]);

  const handleAddToCart = () => {
    setIsModalOpen(true);
     // Logique pour ajouter au panier ici, si nécessaire
    //  navigate('/buy'); // Redirige vers le composant Buy
     {Buy}
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendEmail(userInfo, product);
    setIsModalOpen(false);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }
  if (redirectUrl) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className='text-center mt-4 mb-4'>contactez nous s'il vous plait par marketplace pour le monent sinon voici notre numéro  +229 64549959</div>
        <a href={`${redirectUrl}`}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white
  bg-blue-600 hover:bg-blue-700`}
        >Cliquer ici pour nous écrire un message</a>
      </div>
    );
  }
  return (
    <>
    <Navbar/>
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
            <div className="space-y-5">
              <h1 className="text-3xl font-bold text-gray-900 mt-6">{product.name}</h1>
              <p className="text-2xl font-semibold text-gray-800 mt-6">
                Prix <span className='text-blue-600'>${product.price.toLocaleString()}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mt-6">
                <span className="px-3 py-1 text-sm font-medium bg-gray-100 rounded-full">
                  {product.category}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
                <span className={`px-5 py-1 text-sm font-medium rounded-full ${
                  product.stock > 0 ? 'bg-red-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  Reduction de 20% à partir de 10 achats
                </span>
              </div>
              

              

              <div className="prose prose-sm">
                <h3 className="text-2xl font-semibold mt-6">Caractéristiques</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {isTrending && (
                  <p className="text-2xl text-red-800 mb-2 animate-pulse transition-transform duration-500 hover:scale-110">Produit populaire 🔥</p>
              )}
              

              <div className="prose prose-sm">
                <h3 className="text-2xl font-semibold text-gray-600 mt-6">Option de livraison</h3>
                <p className="text-gray-600">Livraion gratuite
                Nous offrons une garantie de [durée de la garantie, ex. : 1 an] à partir de la date d'achat pour ce produit. La garantie couvre :

                Les défauts de fabrication.
                Les dysfonctionnements du produit dans des conditions normales d'utilisation.
                </p>
              </div>

              <div className="prose prose-sm">
                <h3 className="text-2xl font-semibold text-gray-600 mt-6">Politique et garanties</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>

              {/* <div className="mt-6">
              <h2 className="text-2xl font-semibold">Avis des utilisateurs</h2>
              {product.stock > 0 ? (
                product.review.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 py-2">
                    <p className="font-semibold">{review.user}</p>
                    <p>{review.comment}</p>
                    <p className="text-yellow-500">Note: {review.rating}/5</p>
                  </div>
                ))
              ) : (
                <p>Soyez le premier à donner votre avis !</p>
              )}
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Vous pourriez aussi aimer</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {product.relatedProducts.map((related, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <img src={related.image} alt={related.name} className="w-full h-40 object-cover mb-2 rounded-lg" />
                    <p className="font-bold">{related.name}</p>
                    <p>${related.price}</p>
                  </div>))}
        </div>
      </div> */}

              <div className="pt-6">
                <button
                  disabled={product.stock === 0}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                    product.stock > 0
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.stock > 0 ? (<Buy />) : 'Out of Stock'}
                </button>
              </div> 
            </div>

            {/* Boutons de partage social */}
            <div className="mt-6 p-1   flex space-x-4 flex space-8-4 ">
              <button className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400">Partager sur Facebook</button>
              <button className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400">Partager sur Twitter</button>
              <button className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400">Partager sur WhatsApp</button>
            </div>
          </div>
        </div>
      </div>

       {/* Liste de même categorie */}



       <h2 className="text-3xl font-bold text-gray-800 mb-8 mt-8 text-center">Les products de même Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.filter(sameCategie=>sameCategie.name=sameCategie.idx).map(product => (
          <div>
             <Link 
            key={product.id}
            to={`/products/${product.id}`}
            className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
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
          
        ))}
        
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
            <p>Téléphone: +229 98 53 52 83 / +229 64549959</p>
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
          <p>&copy; {new Date().getFullYear()} Planect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
