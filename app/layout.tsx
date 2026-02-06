import type { Metadata } from "next";
import { Oswald, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const displayFont = Oswald({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-display"
});

const bodyFont = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "OKINAWA GOLF TRIP 2026",
  description: "Okinawa golf trip schedule map"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
