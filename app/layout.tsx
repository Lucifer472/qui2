import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import "./globals.css";

import Footer from "@/components/footer/footer";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FT QUIZ",
  description:
    "Play online quiz contest and check your GK while contest also win coins. Online GK quiz questions answer are from different categories like histroy, cricket and politics, choose your favorite quiz category",
  keywords: "Education, Online Quiz,  Play Quiz, Win Coin, GK, Question Answer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const CheckStarterPage = dynamic(
    () => import("@/components/etc/check-start"),
    {
      ssr: false,
    }
  );
  const CheckLogin = dynamic(() => import("@/components/etc/check-login"), {
    ssr: false,
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="/firebase-messaging-sw.js" strategy="worker" />
        <CheckStarterPage />
        <main className="max-w-[430px] mx-auto w-full min-h-full bg-[#0e0a5f] z-10 relative flex flex-col">
          {children}
          <CheckLogin />
          <Footer />
        </main>
      </body>
    </html>
  );
}
