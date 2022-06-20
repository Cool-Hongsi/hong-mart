// npm run dev => development
// npm run start => production
export const API_ADDRESS = (process.env.NODE_ENV === 'development')
  ? process.env.NEXT_PUBLIC_API_URL_DEV
  : process.env.NEXT_PUBLIC_API_URL_PROD

console.log(`Stage: ${process.env.NODE_ENV}`);
console.log(`API Address: ${API_ADDRESS}`);