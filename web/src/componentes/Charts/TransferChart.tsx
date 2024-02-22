import { useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { chartModeList } from "./ChartFunctions"
import { sharedData } from "./ChartContext";
import Loading from "./Loading"


interface cpuChartProps {
    chartMode: string,
    onChartClick: (data: any) => void,
    onChartLoad: any,
    selectedChart?: boolean,
}

const TransactionChart = ({ chartMode = "default", onChartClick, onChartLoad, selectedChart = false }: cpuChartProps) => {
    const [data, setData] = useState<[number, number][]>([]);
    const [selected, setSelected] = useState<boolean>(selectedChart);
    const context = useContext(sharedData);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8081/data");

        ws.onopen = () => {
            console.log(`conexão aberta em ${TransactionChart.name}`);
            onChartLoad((prevInfo: WebSocket[]) => [...prevInfo, ws]);
        }

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
            console.log("Transfer Connection closed");
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

    const updateContext = () => {
        context.selectedChart.set(TransactionChart.name);
        context.data.set(chartData);
        context.config.set(chartOptions);
    }

    if (context.selectedChart.get() === TransactionChart.name) {

        updateContext()

    }



    return (
        <div
            id="Transaction_chart"
            className="mx-auto text-center pt-3 pb-1 bg-white rounded-lg  border-2 border-blue-700  "
            onClick={() => updateContext}
        >
            <Chart
                chartType="LineChart"
                options={chartOptions}
                data={chartData}
                legendToggle
            />
        </div>
    );
};

export default TransactionChart;
