//import { useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { chartModeList } from "./ChartFunctions"
import Loading from "./Loading"


interface latencyChartProps {
    data: [number, number][];
    chartMode: "default" | "minimalist"
}


const LatencyChart = ({ chartMode, data }: latencyChartProps) => {

    if (data.length === 0) {
        return (
            <Loading />
        );
    }

    const chartData = [["Timestamp ", "Restore latency"], ...data];
    const chartOptions = chartModeList(chartMode, "Latency");
    chartOptions.pointSize = 3
    return (
        <div
            id="Latency_chart"
            className="mx-auto text-center pt-3 pb-1 bg-white rounded-lg  border-2 border-blue-700  "
        >
            <Chart
                chartType="ScatterChart"
                options={chartOptions}
                data={chartData}
                width="100%"
                legendToggle
            />
        </div>
    );
};

export default LatencyChart;
