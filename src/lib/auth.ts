"use client";
import Cookies from "js-cookie";

// ユーザー情報（仮のデータ）
const userData = [
    { name: ["みう", "みうちゃん", "海羽", "飯野海羽", "miu"], pass: "miu_san" },
    { name: ["yuto", "ゆうと", "雄斗"], pass: "ymabe315" },
];

// ✅ ログイン処理
export function handleLogin(name: string, password: string): boolean {
    const user = userData.find((user) => user.name.includes(name) && user.pass === password);
    if (user) {
        Cookies.set("auth", JSON.stringify({ name }), { expires: 10 }); // 10日間有効
        return true;
    }
    return false;
}

// ✅ ログイン状態を確認
export function checkAuth(): boolean {
    if (typeof window === "undefined") return false; // SSR 対策
    const authData = Cookies.get("auth");
    return !!authData; // `auth` がセットされているか
}

// ✅ ログアウト処理
export function handleLogout() {
    Cookies.remove("auth");
}
