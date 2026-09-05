import type { Metadata } from "next";
import { Open_Sans, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import "./css/navbar.css";
import "./css/footer.css";
import "./css/hero.css";
import "./css/team.css";
import "./css/contact.css";
import "./css/growth.css";
import "./css/impact.css";

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

  const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
  });

export const metadata: Metadata = {
  title: "Palana",
  description: "Palana's Website",
  icons: {
    icon: "/mode-dependent-palana.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
