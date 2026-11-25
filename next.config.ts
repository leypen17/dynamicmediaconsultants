import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // The legacy WordPress site used trailing slashes; keeping them preserves existing URLs.
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Facebook Messenger marketing is no longer offered. Send old URLs to the services hub.
      { source: "/messenger", destination: "/services/", permanent: true },
      { source: "/messenger/:path*", destination: "/services/", permanent: true },
      { source: "/services/facebook-messenger-marketing", destination: "/services/", permanent: true },
    ];
  },
};

export default nextConfig;
