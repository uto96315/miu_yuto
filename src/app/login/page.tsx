"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/lib/auth";
import { BgCanvas } from "../parts/bg_canvas";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import localFont from 'next/font/local';

const dotFont = DotGothic16({
    weight: "400",
    subsets: ["latin", "cyrillic", "latin-ext"],
});

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

const press = Press_Start_2P({
    weight: "400",
    subsets: ["greek", "cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function LoginPage() {
    return (
        <div className="w-full h-screen overflow-hidden">
            {/* タイトル */}
            <div className="my-3">
                <p className={`${pixelMplus.className} font-bold text-2xl text-center text-blue-500`}>ログイン</p>
            </div>
            <div className="">
                <BgCanvas />
            </div>
            <div className="fixed bottom-0 w-full">
                <LoginForm />
            </div>
        </div>
    );
}

function LoginForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = handleLogin(name, password);
        if (!success) {
            setError("ユーザー名またはパスワードが間違っています");
        } else {
            router.push("/home");
        }
    };

    return (
        <div className="z-50 w-full max-w-sm bg-gray-400 p-6 shadow-md backdrop-blur-md bg-opacity-80">
            <form onSubmit={onSubmit}>
                <div className=" mb-4">
                    <CustomInput placeholder="お名前" onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <CustomInput placeholder="パスワード" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600">
                    ログイン
                </button>
            </form>
        </div>
    );
}

const CustomInput = ({
    placeholder,
    type = "text",
    onChange,
}: {
    placeholder: string;
    type?: string;
    onChange: (e: any) => void;
}) => {
    return <input
        className="w-full px-3 py-2"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
    />;
};
