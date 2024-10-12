"use client";
import { DM_Sans } from "next/font/google"; // Import Fira Sans font correctly
import "./globals.css";

// Load the Fira Sans font with subsets
const firaSans = DM_Sans({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaSans.className}>
      <body>{children}</body>
    </html>
  );
}
