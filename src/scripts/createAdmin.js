// Run this script once to set up the admin user in Firebase
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9TUQRItFJGdgJQlvkeNzsF1EoxGUW34s",
  authDomain: "e-socialize-management.firebaseapp.com",
  projectId: "e-socialize-management",
  storageBucket: "e-socialize-management.firebasestorage.app",
  messagingSenderId: "1047987512112",
  appId: "1:1047987512112:web:ef7dbfceb0944d70061ef5",
  measurementId: "G-ZE1PT2K9TT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Create admin user function
async function createAdminUser() {
  try {
    // Admin credentials
    const email = 'jitendra.modi@gmail.com';
    const password = '@Positive123';

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('Admin user created:', user.uid);

    // Store admin user in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: 'Admin User',
      role: 'admin',
      permissions: {
        'architecture': true,
        'app-ui': true,
        'pitch-deck': true,
        'business-strategy': true,
        'traction-analysis': true,
        'roadmap': true
      },
      createdAt: new Date().toISOString(),
      isAdmin: true
    });

    console.log('Admin user data stored in Firestore');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    
    // If user already exists, that's ok
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin user already exists');
      process.exit(0);
    } else {
      process.exit(1);
    }
  }
}

// Run the function
createAdminUser(); 