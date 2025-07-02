import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@ant-design/icons', 'antd']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Add PWA support in production
      const { GenerateSW } = require('workbox-webpack-plugin');
      
      config.plugins.push(
        new GenerateSW({
          swDest: 'sw.js',
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /\/api\/transactions\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'transactions-api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 5 // 5 minutes
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                }
              }
            }
          ]
        })
      );
    }
    
    return config;
  }
};

export default nextConfig; 