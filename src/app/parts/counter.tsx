export const Counter = (prop: { timeLeft: { days: number, hours: number, minutes: number, seconds: number; }; }) => {

    return (
        <div className="">
            <div className="bg-white bg-opacity-95 py-10 px-5">
                <h1>次に会えるまであと</h1>
                <div className="flex items-center space-x-4">
                    <TimeSpan text={`${prop.timeLeft.days}`} unit="日" />
                    <TimeSpan text={`${prop.timeLeft.hours}`} unit="時間" />
                    <TimeSpan text={`${prop.timeLeft.minutes}`} unit="分" />
                    <TimeSpan text={`${prop.timeLeft.seconds}`} unit="秒" />
                </div>
                {/* slickで画像を流す */}
            </div>
        </div>
    );
};

const TimeSpan = (prop: { text: String, unit: String, }) => {
    return <div className="flex items-end">
        <span className="bg-blue-300 bg-opacity-80 p-2 my-2 text-xl">{prop.text}</span>
        <span className="p-2 my-2">{prop.unit}</span>
    </div>;
};
