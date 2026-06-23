import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import { ModalProvider } from "@/context/ModalContext";
import PublicShell from "@/components/layout/PublicShell";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const OG_IMAGE =
  "https://res.cloudinary.com/dioiyb833/image/upload/w_1200,h_630,c_fill,g_auto,f_jpg,q_auto:good,fl_progressive/v1782221554/38435b08-7761-42b1-9f76-ce126a28bb1e.png";

export const metadata: Metadata = {
  title: {
    default: "Teens Football Project",
    template: "%s | TFP",
  },
  description:
    "Building Nigeria's next generation of football talent through structured youth development, coaching, and competitive football via the Afigio league.",
  metadataBase: new URL("https://teensfootballproject.org"),
  openGraph: {
    title: "Teens Football Project",
    description:
      "Building Nigeria's next generation of football talent through structured youth development and competitive football.",
    url: "https://teensfootballproject.org",
    siteName: "Teens Football Project",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Teens Football Project — Building Nigeria's Next Generation" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teens Football Project",
    description:
      "Building Nigeria's next generation of football talent through structured youth development and competitive football.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <ModalProvider>
          <PublicShell>
            {children}
          </PublicShell>
        </ModalProvider>
      </body>
    </html>
  );
}
