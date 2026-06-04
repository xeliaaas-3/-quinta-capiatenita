import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quinta Capiateñita | Espacio Exclusivo para Eventos en Paraguay",
  description:
    "Quinta Capiateñita — el venue premium en Capiatá para bodas, cumpleaños, baby showers y eventos corporativos. Piscina resort, quincho gourmet, salón de eventos y jardines exclusivos.",
  keywords: [
    "quinta en Capiatá",
    "alquiler de quinta en Paraguay",
    "quinta para cumpleaños",
    "quinta para bodas",
    "quinta para eventos",
    "quinta con piscina",
    "quinta en Capiatá Paraguay",
    "salon de eventos Paraguay",
    "venue bodas Paraguay",
  ],
  openGraph: {
    title: "Quinta Capiateñita | Espacio Exclusivo para Eventos",
    description:
      "Donde los mejores momentos se convierten en recuerdos inolvidables. Reservá tu fecha en la quinta más exclusiva de Capiatá.",
    type: "website",
    locale: "es_PY",
    url: "https://xn--quintacapiateita-jub.com",
    siteName: "Quinta Capiateñita",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quinta Capiateñita | Venue Premium en Paraguay",
    description:
      "Piscina resort, quincho gourmet, salón de eventos. El espacio ideal para celebrar sin límites.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1F4D36" />
      </head>
      <body>{children}</body>
    </html>
  );
}
