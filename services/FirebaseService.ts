import { initializeApp } from 'firebase/app';
import { initializeAuth, GoogleAuthProvider, inMemoryPersistence } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getDatabase, Database } from 'firebase/database';
import { firebaseConfig } from '../config/firebaseConfig';
import { UtilsHandle } from '../utils/index';
import { User } from "@/interface/types";

// Initialisation de Firebase avec la persistance de l'authentification
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: inMemoryPersistence
});

const googleAuthProvider = new GoogleAuthProvider();

class FirebaseService {
  private static instance: FirebaseService;
  auth: ReturnType<typeof initializeAuth>; // Update the type to any
  GoogleAuthProvider: GoogleAuthProvider; // Update the type to any
  firestore: Firestore;
  storage: FirebaseStorage;
  database: Database;
  UtilsHandleClass: UtilsHandle;

  private constructor() {
    this.auth = auth;
    this.GoogleAuthProvider = googleAuthProvider;
    this.firestore = getFirestore(app);
    this.storage = getStorage(app);
    this.database = getDatabase(app);
    this.UtilsHandleClass = new UtilsHandle();

  }
  
  // Méthode pour récupérer l'instance de FirebaseService
  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

}

export default FirebaseService.getInstance();  