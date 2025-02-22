"use client";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/auth";

export default function HomePage() {
    const router = useRouter();

    const onLogout = () => {
        handleLogout();
        router.push("/login"); // ログアウト後ログイン画面へ
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
            <h1 className="text-2xl font-bold mb-6">ホーム画面</h1>
            <button
                onClick={onLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
                ログアウト
            </button>
        </div>
    );
}
