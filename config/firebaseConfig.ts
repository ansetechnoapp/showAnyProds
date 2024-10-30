export const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_API_KEY,
  authDomain: import.meta.env.VITE_PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PUBLIC_APP_ID,
};
export const firebaseConfigRemix = {
  apiKey: process.env.VITE_PUBLIC_API_KEY,
  authDomain: process.env.VITE_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.VITE_PUBLIC_PROJECT_ID,
  storageBucket: process.env.VITE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.VITE_PUBLIC_APP_ID,
};