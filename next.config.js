/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['res.cloudinary.com'],
  },
  // redirects: async () => {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/maintenance',
  //       permanent: false
  //     }
  //   ]
  // }
}
