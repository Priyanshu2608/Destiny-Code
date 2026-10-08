import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";
import { bodyFont, displayFont } from "@/lib/fonts";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { StarField } from "@/components/ui/StarField";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.businessName} · Numerology & Astrology Readings`,
    template: `%s · ${site.businessName}`,
  },
  description: site.seoDescription,
  openGraph: {
    type: "website",
    siteName: site.businessName,
    title: `${site.businessName} · Numerology & Astrology Readings`,
    description: site.seoDescription,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#05061a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <StarField />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
