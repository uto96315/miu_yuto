"use client";
import './globals.css';
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import localFont from 'next/font/local';

export const metadata = {
  title: "みうゆとアプリ",
  description: "寂しさが少しでも和らげば！",
  openGraph: {
    title: "みうゆとアプリ",
    description: "寂しさが少しでも和らげば！",
    url: "https://x.gd/rIpu5",
    images: [
      {
        url: "https://your-vercel-url.com/slick/01.jpeg", // 絶対URLにする
        width: 800,
        height: 600,
        alt: "みうゆとアプリのOG画像",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "みうゆとアプリ",
    description: "寂しさが少しでも和らげば！",
    images: ["https://your-vercel-url.com/slick/01.jpeg"],
  },
};


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
        <title>みうゆとアプリ</title>
        <meta name="description" content="寂しさが少しでも和らげばと思って作りました！更新していきます！" />
        <meta property="og:url" content="https://x.gd/rIpu5" />
        <meta property="og:image" content="/slick/01.jpeg" />
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
