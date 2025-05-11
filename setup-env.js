const fs = require('fs');
const path = require('path');

// Firebase configuration values
const envValues = {
  NEXT_PUBLIC_FIREBASE_API_KEY: 'AIzaSyA9TUQRItFJGdgJQlvkeNzsF1EoxGUW34s',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'e-socialize-management.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'e-socialize-management',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'e-socialize-management.firebasestorage.app',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '1047987512112',
  NEXT_PUBLIC_FIREBASE_APP_ID: '1:1047987512112:web:ef7dbfceb0944d70061ef5',
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'G-ZE1PT2K9TT'
};

// Create .env.local file
const envLocalContent = Object.entries(envValues)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync(path.join(__dirname, '.env.local'), envLocalContent);

// Create .env.example file
const envExampleContent = Object.entries(envValues)
  .map(([key]) => `${key}=your_${key.toLowerCase()}_here`)
  .join('\n');

fs.writeFileSync(path.join(__dirname, '.env.example'), envExampleContent);

console.log('Environment files created successfully!');
console.log('1. .env.local - Contains actual values (git-ignored)');
console.log('2. .env.example - Template for other developers'); 