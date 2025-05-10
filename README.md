# E-Socialize Management System

A modern, responsive portal for E-Socialize by Positive Emotions Lab, built with Next.js and Tailwind CSS.

## Features

- Responsive grid layout
- Modern UI with custom color scheme
- Interactive components
- Placeholder sections for various content types

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Start production server:
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