# E-Socialize Management System

A modern, responsive portal for E-Socialize by Positive Emotions Lab, built with Next.js and Tailwind CSS.

## Features

- Responsive grid layout
- Modern UI with custom color scheme
- Interactive components
- Placeholder sections for various content types

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/jitendra-modi/esocialize-portal.git
   cd esocialize-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Run the setup script to create .env.local
   node setup-env.js
   ```
   Or manually create `.env.local` with the following variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Start production server:
   ```bash
   npm start
   ```

## Asset Management

### Adding Documents
Place PDF documents in the following locations:
- Pitch Deck: `/public/pitch-deck.pdf`
- Other Documents: `/public/docs/`

### Adding Images
Place images in the following locations:
- Architecture Diagram: `/public/architecture.png`
- UI Screenshots: `/public/screenshots/`

## Project Structure

- `/src/components/` - Reusable components
- `/public/` - Static assets
- `/src/app/` - Next.js app router pages

## Customization

The portal uses a custom color scheme defined in `tailwind.config.ts`:
- Teal: Primary accent color
- Navy: Secondary accent color

## Development

This project uses:
- Next.js 14
- TypeScript
- Tailwind CSS
- ESLint 

## Deployment

See [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md) for detailed deployment instructions.

## About

E-Socialize Management System is a modern web application built to streamline social management processes. 