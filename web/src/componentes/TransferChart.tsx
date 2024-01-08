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
                    console.log("hey");
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
                max: 60000,
            },
        },
    };

    return (
        <div className="container chart-container chart-container mt-2">
            <div className="row justify-content-center text-center">
                <h2>Transições</h2>
                <Chart
                    chartType="LineChart"
                    options={chartOptions}
                    data={chartData}
                    legendToggle
                />
            </div>
        </div>
    );
};

export default TransferChart;
