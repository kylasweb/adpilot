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
            <body className={inter.className}>
                <App>
                    {children}
                    <Toaster />
                </App>
            </body>
        </html>
    )
}