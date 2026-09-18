/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nzvyjnmmwwbuhyeocyia.supabase.co",
        pathname: "/storage/v1/object/public/property-images/**",
      },
    ],
  },
};

module.exports = nextConfig;
