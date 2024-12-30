import "./globals.css";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Arii Tools",
  description: "A collection of Arii tools built by Imtiaz Raqib",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans`}>{children}</body>
    </html>
  );
}
