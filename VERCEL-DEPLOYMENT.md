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
   - Add environment variables if needed (see below)
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

## Environment Variables

If you need to change the Firebase configuration, add these environment variables in the Vercel dashboard:

- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

## Post-Deployment

After successful deployment:

1. Configure any custom domains if needed
2. Set up environment variables if you didn't during initial deployment
3. Monitor the deployment in the Vercel dashboard

## Troubleshooting

- **Build Errors**: Check the build logs in the Vercel dashboard
- **Runtime Errors**: Use Vercel logs to diagnose issues
- **Preview Deployments**: Each PR/branch gets its own preview URL 