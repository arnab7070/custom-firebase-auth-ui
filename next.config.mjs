/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '', // You can leave this empty for default ports
                pathname: '/**', // Allow any pathname under the hostname
            },
        ],
    },
};

export default nextConfig;
