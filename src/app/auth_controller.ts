import Cookies from "js-cookie";


const userData = [{
    name: "みう",
    pass: "miu_san"
},
{
    name: "ゆうと",
    pass: "yuto_san",
},];

// ログイン処理
export function handleLogin(name: string, password: string): boolean {
    const user = userData.find((user) => user.name === name && user.pass === password);
    if (user) {
        Cookies.set("auth", JSON.stringify({ email: name }), { expires: 10 }); // 10日間有効
        return true;
    }
    return false;
}


// ログイン状態を確認
export function checkAuth(): boolean {
    return false;
    // if (typeof window === "undefined") return false; // SSRで実行されるのを防ぐ

    // const authData = Cookies.get("auth");
    // console.log("AuthData:", authData); // デバッグ用

    // if (!authData) return false;
    // try {
    //     const user = JSON.parse(authData);
    //     return !!user.name; // user.name があるかチェック
    // } catch (error) {
    //     console.error("Invalid Cookie Data:", error);
    //     return false;
    // }
}


// ログアウト処理
export function handleLogout() {
    Cookies.remove("auth");
}