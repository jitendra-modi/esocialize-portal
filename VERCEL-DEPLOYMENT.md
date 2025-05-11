# Deploying to Vercel

This document provides instructions for deploying the E-Socialize Management System to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git repository with your project (like GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy from Vercel Dashboard

1. Log in to your Vercel account
2. Click "Add New..." → "Project"
3. Import your Git repository (connect to GitHub/GitLab/Bitbucket if needed)
4. Select the "esocialize-portal" repository
5. Configure the project:
   - Framework Preset: Next.js
   - Build and Output Settings should be auto-detected
   - Add environment variables (see below)
6. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Deploy from the project directory:
   ```
   cd path/to/esocialize-portal
   vercel
   ```

4. Follow the prompts to configure your project

## Environment Variables Setup

### Required Environment Variables

Add these environment variables in the Vercel dashboard (Settings → Environment Variables):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA9TUQRItFJGdgJQlvkeNzsF1EoxGUW34s
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=e-socialize-management.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=e-socialize-management
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=e-socialize-management.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1047987512112
NEXT_PUBLIC_FIREBASE_APP_ID=1:1047987512112:web:ef7dbfceb0944d70061ef5
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ZE1PT2K9TT
```

Important notes:
1. Add these variables to all environments (Production, Preview, and Development)
2. The `NEXT_PUBLIC_` prefix is required for client-side access
3. After adding variables, redeploy your application

### Firebase Configuration

1. Go to Firebase Console (https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings → General
4. Under "Your apps", add a new web app if not already added
5. Add your Vercel domain to authorized domains:
   - Go to Authentication → Settings → Authorized domains
   - Add your Vercel domain (e.g., `your-project.vercel.app`)

## Post-Deployment

After successful deployment:

1. Configure any custom domains if needed
2. Set up environment variables if you didn't during initial deployment
3. Monitor the deployment in the Vercel dashboard
4. Test all Firebase functionality:
   - Authentication
   - Firestore database access
   - Storage operations (if any)

## Troubleshooting

- **Build Errors**: Check the build logs in the Vercel dashboard
- **Runtime Errors**: Use Vercel logs to diagnose issues
- **Firebase Connection Issues**:
  - Verify environment variables are correctly set
  - Check Firebase security rules
  - Ensure Vercel domain is added to authorized domains
- **Preview Deployments**: Each PR/branch gets its own preview URL 