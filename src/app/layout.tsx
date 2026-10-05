import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FDFCFB',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "NarangOS | Understand Your Infrastructure",
  description: "A data-centric intelligence layer for computing infrastructure. Connect packets, workloads, and applications into a single contextual data layer.",
  keywords: ["infrastructure observability", "packet-level visibility", "data-centric intelligence", "kubernetes observability", "eBPF", "cloud infrastructure"],
  openGraph: {
    title: "NarangOS | Understand Your Infrastructure",
    description: "A data-centric intelligence layer for computing infrastructure.",
    type: "website",
    siteName: "NarangOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "NarangOS | Understand Your Infrastructure",
    description: "A data-centric intelligence layer for computing infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
