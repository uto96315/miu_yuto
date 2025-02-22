import { useEffect, useRef } from "react";

export const BgCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // キャンバスのサイズ設定
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 300;
        const caracterSize = 72;

        // 画像の読み込み
        const bg = new Image();
        bg.src = "/bg.png"; // 背景画像

        const charImages = ["/men.png", "/women.png"]; // キャラ画像 (public/ に配置)
        const heartImage = new Image();
        heartImage.src = "/heart.png"; // ハート画像 (衝突時)

        // キャラデータ
        const characters = Array.from({ length: 2 }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: (Math.random() - 0.5) * 4,
            speedY: (Math.random() - 0.5) * 4,
            image: new Image(),
            showHeart: false, // ハート表示フラグ
            heartTimer: 0, // ハートの表示時間
        }));

        // キャラの画像をセット
        characters.forEach((char, index) => {
            char.image.src = charImages[index % charImages.length];
        });

        function checkCollision(c1: any, c2: any) {
            const dx = c1.x - c2.x;
            const dy = c1.y - c2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < caracterSize; // キャラの大きさ32px
        }

        function animate() {
            if (!canvasRef.current) return;
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
            ctx!.drawImage(bg, 0, 0, canvas!.width, canvas!.height);

            characters.forEach((char, i) => {
                // キャラの移動
                char.x += char.speedX;
                char.y += char.speedY;

                // 壁で反射
                if (char.x < 0 || char.x > canvas!.width - caracterSize) char.speedX *= -1;
                if (char.y < 0 || char.y > canvas!.height - caracterSize) char.speedY *= -1;

                // 他のキャラと衝突チェック
                characters.forEach((other, j) => {
                    if (i !== j && checkCollision(char, other)) {
                        char.showHeart = true;
                        char.heartTimer = 30; // 30フレームハート表示
                    }
                });

                // キャラを描画
                ctx!.drawImage(char.image, char.x, char.y, caracterSize, caracterSize);

                // ハートを表示
                if (char.showHeart) {
                    ctx!.drawImage(heartImage, char.x + 8, char.y - 16, 16, 16);
                    char.heartTimer--;
                    if (char.heartTimer <= 0) {
                        char.showHeart = false;
                    }
                }
            });

            requestAnimationFrame(animate);
        }

        bg.onload = () => {
            animate();
        };
    }, []);
    return <canvas ref={canvasRef}></canvas>;
};