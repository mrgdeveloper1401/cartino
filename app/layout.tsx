import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const dana = localFont({
  src: [
    {
      path: "../public/font/DanaFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/DanaFaNum-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-dana",
  display: "swap",
});

export const metadata: Metadata = {
  title: "cartino",
  description: "cartino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn("h-full", "antialiased")}
    >
      <body className={cn("min-h-full flex flex-col", dana.className)}>
        {children}
      </body>
    </html>
  );
}
