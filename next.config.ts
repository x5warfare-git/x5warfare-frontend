/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary'ye tam erişim izni
        port: '',
        pathname: '/**', 
      },
      // Eğer daha önce eklediğimiz 127.0.0.1 varsa onu da tutabilirsin
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/uploads/**',
      }
    ],
  },
};

export default nextConfig;