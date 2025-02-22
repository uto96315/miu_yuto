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


  useEffect(() => {
    const botAgents = ["Twitterbot", "facebookexternalhit", "LinkedInBot", "Slackbot", "WhatsApp"];
    const isBot = botAgents.some((bot) => navigator.userAgent.includes(bot));

    if (!isBot) {
      if (!isLoggedIn && pathname !== "/login") {
        router.push("/login");
      }
      if (isLoggedIn && pathname === "/login") {
        router.push("/home");
      }
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
