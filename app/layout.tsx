import type { Metadata } from "next";
import "./globals.css";
import "./polish.css";
import "./detail.css";
import "./home-refine.css";
import "./final-polish.css";

export const metadata: Metadata = {
  title: "Bandra Burrito | Zomato Lite",
  description: "Write and read reviews for Bandra Burrito.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
