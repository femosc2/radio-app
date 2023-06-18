/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'static-cdn.sr.se',
            port: '',
            pathname: '/images/**',
          },
        ],
      },
}

module.exports = nextConfig
