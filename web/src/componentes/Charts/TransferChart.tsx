//import { useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { chartModeList } from "./ChartFunctions"
//import { sharedData } from "./ChartContext";
import Loading from "./Loading"


interface cpuChartProps {
    data: [number, number][];
    chartMode: "default" | "minimalist"
}

const TransactionChart = ({ chartMode, data, }: cpuChartProps) => {

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

    const chartOptions = chartModeList(chartMode, "Transaction Chart");

    return (
        <div
            id="Transaction_chart"
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

export default TransactionChart;
