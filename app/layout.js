import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MyPortfolio - Web Developer",
  description: "A passionate web developer creating beautiful and functional digital experiences. Explore my portfolio to see my work in web development, UI/UX design, and more.",
  keywords: ["web developer", "portfolio", "next.js", "react", "frontend developer"],
  authors: [{ name: "John Doe" }],
  openGraph: {
    title: "MyPortfolio - Web Developer",
    description: "A passionate web developer creating beautiful and functional digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
