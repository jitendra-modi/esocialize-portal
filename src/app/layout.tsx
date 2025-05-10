"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { AdminProvider } from '@/context/AdminContext'
import SiteHeader from '@/components/SiteHeader'
import Head from 'next/head'

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#1a1a2e]">
        <AdminProvider>
          <AuthProvider>
            <SiteHeader />
            {children}
          </AuthProvider>
        </AdminProvider>
      </body>
    </html>
  )
} 