import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Loading from "./Loading"
import { chartModeList } from "./ChartFunctions"


interface cpuChartProps {
    chartMode: string,
    onChartClick: (data: any) => void
}

const TransferChart = ({ chartMode = "default", onChartClick }: cpuChartProps) => {
    const [data, setData] = useState<[number, number][]>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8081/data");

        ws.onmessage = (event) => {
            try {
                const endMessage = "CSV file successfully processed";
                if (event.data !== endMessage) {


                    const message = JSON.parse(event.data);
                    setData((prevInfo) => [...prevInfo, message]);

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


    }, []);

    if (data.length === 0) {
        return (
            <Loading />
        );
    }

    const chartData = [["Timestamp", "Transitions", { role: "style" }], ...data.map((item) => [
        item[0],
        item[1],
        item[1] < 500
            ? "point { size: 6; fill-color: #a52714; }"
            : null,
    ])]
    const chartOptions: any = chartModeList(chartMode);

    chartOptions.title = "Transactions"
    return (
        <div onClick={() => onChartClick(data)} className="mx-auto w-full text-center py-3 bg-white rounded">
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
