import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "Blog Kori",
  description: "Blog Kori – Read and share amazing articles on various topics.",
  keywords: "Blog Kori, blogging, articles, tech, lifestyle, SEO",
  authors: [{ name: "Azizul Haque " }],
  openGraph: {
    title: "Blog Kori",
    description:
      "Blog Kori – Read and share amazing articles on various topics.",
    url: `${process.env.NEXT_APP_URL}`,
    siteName: "Blog Kori",
    images: [
      {
        url: `${process.env.NEXT_APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630
      }
    ],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Blog Kori",
              url: `${process.env.NEXT_APP_URL}`
            })
          }}
        />

        {/* Toaster for notifications */}
        <Toaster />
      </body>
    </html>
  );
}
