"use client";
import { useEffect, useState } from "react";
import { Counter } from "../parts/counter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { handleLogout } from "../auth_controller";

export default function HomePage() {
    // ターゲットの日付を設定（例: 2025/3/13 15:00:00）
    const targetDate = new Date("2025-03-13T15:00:00");

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();
            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[url('/bg.png')] bg-contain bg-opacity-50">
            <div className=" absolute top-0" onClick={() => handleLogout()}>
                <Counter timeLeft={timeLeft} />
            </div>

            <div>
                {/* ここに二人の画像 時間が短くなればなるほど距離が近くなる */}
            </div>

            <div className="absolute bottom-0 w-full">
                <SlickImages />
            </div>
        </div>
    );
}

const SlickImages = () => {
    // slick の設定
    const sliderSettings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const images = ["/slick/01.jpeg", "/slick/02.jpeg",
        // "/slick/03.JPG", "/slick/04.JPG", "/slick/05.JPG", 
        "/slick/06.JPG"
    ];

    return <div className="w-full max-w-lg mx-auto mt-8">
        <Slider {...sliderSettings}>
            {images.map((src, index) => (
                <div key={index} className="rounded-2xl overflow-hidden max-h-96">
                    <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-fit object-center"
                    />
                </div>
            ))}
        </Slider>
    </div>;
};