import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Lumina Medi Spa | Medical Aesthetics in Mississauga",
  description:
    "Lumina Medi Spa offers expert injectables, facials, laser treatments, and body sculpting in Mississauga, Ontario. Personalized medical aesthetic care.",
  keywords: "medical spa, Mississauga, injectables, Botox, facials, laser, body sculpting, skin treatments",
  openGraph: {
    title: "Lumina Medi Spa | Medical Aesthetics in Mississauga",
    description: "Expert injectables, advanced skin treatments, laser services, and body sculpting — personalized with genuine care.",
    url: "https://luminamedispa.ca",
    siteName: "Lumina Medi Spa",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ivory text-text-dark font-inter antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#15110D",
              color: "#E8D8C3",
              border: "1px solid rgba(214,181,109,0.3)",
              fontFamily: "Inter, sans-serif",
            },
            success: {
              iconTheme: { primary: "#D6B56D", secondary: "#080604" },
            },
          }}
        />
      </body>
    </html>
  );
}
