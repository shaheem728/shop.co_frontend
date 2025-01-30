import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors:true,
  },
  eslint:{
    ignoreDuringBuilds:true,
  },
  images: {
    domains: ['127.0.0.1', 'localhost','shop-co-backend-six.vercel.app'], 
  },
};

export default nextConfig;
