import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageLoader } from "@/components/ui/PageLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grupo del Este | Software-Based Experiences",
    template: "%s | Grupo del Este",
  },
  description:
    "We craft exceptional digital experiences through software development, consultancy, and innovative in-house products.",
  keywords: [
    "software development",
    "consultancy",
    "digital products",
    "web development",
    "mobile apps",
    "technology",
  ],
  authors: [{ name: "Grupo del Este" }],
  creator: "Grupo del Este",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grupodeleste.com",
    siteName: "Grupo del Este",
    title: "Grupo del Este | Software-Based Experiences",
    description:
      "We craft exceptional digital experiences through software development, consultancy, and innovative in-house products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo del Este | Software-Based Experiences",
    description:
      "We craft exceptional digital experiences through software development, consultancy, and innovative in-house products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <PageLoader />
          <ScrollProgress />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
