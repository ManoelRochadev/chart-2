import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const TransferChart = () => {
    const [info, setInfo] = useState<[number, number][]>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8081/data");

        ws.onmessage = (event) => {
            try {
                const endMessage: string = "CSV file successfully processed";
                if (event.data !== endMessage) {


                    const message = JSON.parse(event.data);
                    setInfo((prevInfo) => [...prevInfo, message]);

                }
                if (event.data === endMessage) {
                    ws.close();
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        ws.onclose = () => {
            console.log("Connection closed");
        };

        // return () => {
        //   ws.close();
        // };
    }, []);

    if (info.length === 0) {
        return (
            <div className="flex flex-row top-0 w-full h-full pointer-events-none">
                <div className="h-fit sm:w-[90vw] md:w-full max-w-xl sm:max-w-lg md:max-w-2xl lg:max-w-lg py-10 px-7 mx-auto my-auto space-y-5 bg-slate-300 rounded-lg shadow-md text-center">
                    <p className="animate-pulse text-slate-800 text-lg font-mono">
                        loading...
                    </p>
                </div>
            </div>);
    }

    const chartData = [["Timestamp", "Transitions", { role: "style" }], ...info.map((item) => [
        item[0],
        item[1],
        item[1] < 500 
          ? "point { size: 6; fill-color: #a52714; }"
          : null,
      ])
    ]

    const chartOptions = {
        chart: {
            title: "Transitions",
            subtitle: "in %",
        },
        hAxis: {
            title: "Time",
        },
        vAxis: {
            title: "Transitions",
            viewWindow: {
                min: 0,
                max: 40000,
            },
        },
        pointSize: 1,
    };

    return (
        <div className="mx-auto w-full text-center py-3 bg-white rounded">
            <h2 className="text-xl font-semibold">Transações</h2>
            <Chart
                chartType="LineChart"
                options={chartOptions}
                data={chartData}
                legendToggle
            />
        </div>
    );
};

export default TransferChart;
