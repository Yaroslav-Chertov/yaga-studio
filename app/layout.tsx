import type { Metadata, Viewport } from "next";
import "../styles/globals.scss";
import CookieConsent from "@/components/CookieConsent";
import { seoKeywords, siteConfig, siteUrl } from "@/data/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a6485",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteUrl,
  description: siteConfig.description,
  sameAs: [siteConfig.telegram].filter((url) => url && url !== "#"),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "YAGA Studio — брендинг, интерфейсы и веб-разработка",
    template: "%s | YAGA Studio",
  },
  description: siteConfig.description,
  keywords: seoKeywords,
  applicationName: siteConfig.name,
  category: "design studio",
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: true,
    telephone: true,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    url: siteUrl,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "YAGA Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
