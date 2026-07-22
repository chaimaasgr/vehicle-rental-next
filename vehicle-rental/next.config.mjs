/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Les images sont désormais servies localement depuis /public/images.
    // dangerouslyAllowSVG est nécessaire car les visuels génériques de
    // remplacement (placeholders) sont fournis au format SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
