"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { AdminProvider } from '@/context/AdminContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>E-Socialize Management System</title>
        <meta name="description" content="Portal for E-Socialize by Positive Emotions Lab" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <AdminProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AdminProvider>
      </body>
    </html>
  )
} 