import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Imágenes de placeholder (mock data) — placehold.co devuelve SVG
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // Imágenes de producción (Supabase Storage)
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
    // Necesario porque placehold.co devuelve SVG
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
