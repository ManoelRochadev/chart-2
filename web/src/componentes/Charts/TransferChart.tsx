import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface TransitionData {
    timestamp: number;
    transitions: number;
}

const TransferChart = () => {
    const [info, setInfo] = useState<TransitionData[]>([]);

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
        return <div className="loading">Loading...</div>;
    }

    const chartData = [["Timestamp", "Transitions"], ...info];

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
    };

    return (
            <div className="mx-auto w-full text-center py-3 bg-white rounded ">
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
