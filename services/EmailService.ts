import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY; 

interface UserInfo {
  name: string;
  email: string;
  address: string;
}

interface Product {
  name: string;
  price: number;
  id: string;
}

export const sendEmail = async (userInfo: UserInfo, product: Product) => {
  try {
    const templateParams = {
      from_name: userInfo.name,
      user_email: userInfo.email,
      message: `${userInfo.address},product_name: ${product.name},product_price: ${product.price},product_id: ${product.id}`,
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send email');
  }
};
