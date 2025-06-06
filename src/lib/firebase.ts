import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA9TUQRItFJGdgJQlvkeNzsF1EoxGUW34s",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "e-socialize-management.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "e-socialize-management",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "e-socialize-management.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1047987512112",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1047987512112:web:ef7dbfceb0944d70061ef5",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-ZE1PT2K9TT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence when possible
if (typeof window !== 'undefined') {
  try {
    enableIndexedDbPersistence(db)
      .then(() => {
        console.log('Offline persistence enabled');
      })
      .catch((err) => {
        console.error('Offline persistence error:', err);
      });
  } catch (error) {
    console.error('IndexedDB persistence error:', error);
  }
}

// Function to create the admin user (should be called only once during setup)
export const createAdminUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'jitendra.modi@gmail.com', 
      '@Positive123'
    );
    console.log('Admin user created:', userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    // If error code is 'auth/email-already-in-use', that's actually fine
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin user already exists');
      return null;
    }
    throw error;
  }
};

// Function to sign in the admin user
export const signInAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing in admin:', error);
    throw error;
  }
};

// For debugging Firestore access
console.log('Firebase initialized with project ID:', firebaseConfig.projectId);

export { auth, db }; 