import type { Metadata } from "next";
import "./globals.css";

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
