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

    const chartData = [["Timestamp", "Transitions", { role: "style" }], ...info.map((item) => [
        item[0],
        item[1],
        item[1] < 50 
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
                max: 60000,
            },
        },
        pointSize: 1,
    };

    return (
        <div className="container chart-container chart-container mt-2">
            <div className="row justify-content-center text-center">
                <h2>Transferências</h2>
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
