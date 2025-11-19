/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@prisma/client', 'prisma'],
    images: {
        domains: ['localhost'],
    },
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
    },
}

export default nextConfig