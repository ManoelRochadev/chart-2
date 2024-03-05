import { Chart } from "react-google-charts";
import { chartModeList } from "./ChartFunctions"
import Loading from "./Loading"


interface cpuChartProps {
    chartMode: "default" | "minimalist";
    selectedChart?: boolean;
    data: [number, number][]
}


const CpuChart = ({ chartMode, data }: cpuChartProps) => {

    if (data.length === 0) {
        return (
            <Loading />
        );
    }

    const chartData = [["Timestamp", "CPU Usage"], ...data];
    const chartOptions = chartModeList(chartMode, "CPU Usage");

    return (

        <div
            id="cpu_chart"
            className="mx-auto text-center pt-3 pb-1 bg-white rounded-lg  border-2 border-blue-700  "
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

export default CpuChart;

