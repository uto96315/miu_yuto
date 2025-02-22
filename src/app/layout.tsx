"use client";
import './globals.css';
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import localFont from 'next/font/local';

// ローカルフォントの設定
const pixelMplus = localFont({
  src: [
    {
      path: '../fonts/PixelMplus10-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/PixelMplus10-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-pixel-mplus',
});

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = checkAuth();

  const metadata = {
    title: "みうゆとアプリ",
    description: "寂しさが少しでも和らげば！",
    openGraph: {
      title: "みうゆとアプリ",
      description: "寂しさが少しでも和らげば！",
      url: "https://x.gd/rIpu5",
      images: [
        {
          url: "/public/slick/01.jpeg",
          width: 800,
          height: 600,
          alt: "My App OG Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "みうゆとアプリ",
      description: "寂しさが少しでも和らげば！",
      images: ["/public/slick/01.jpeg"],
    },
  };


  useEffect(() => {
    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login"); // 未ログインならログイン画面へ
    }
    if (isLoggedIn && pathname === "/login") {
      router.push("/home"); // ログイン済みならホームへ
    }
  }, [isLoggedIn, pathname, router]);

  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />

      </head>
      <body className={pixelMplus.className}>
        {children}
      </body>
    </html>
  );
}
