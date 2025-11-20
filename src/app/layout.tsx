import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import App from '../App'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Adsilo - AI-Powered Digital Marketing Platform',
    description: 'Comprehensive digital marketing platform with AI-powered tools for campaigns, analytics, and automation.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Load display fonts in head to avoid @import placement issues in compiled CSS */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=Crimson+Pro:wght@400;600&display=swap" rel="stylesheet" />
            </head>
            <body className={inter.className}>
                <App>
                    {children}
                    <Toaster />
                </App>
            </body>
        </html>
    )
}