//import { useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { chartModeList } from "./ChartFunctions"
//import { sharedData } from "./ChartContext";
//import Loading from "./Loading"

interface FocusChartProps {
    data: [number, number][],
    xLabel: string,
    yLabel: string,
    chartMode?: string
}


const FocusChart = ({ chartMode = "default", data, xLabel, yLabel }: FocusChartProps) => {
    //  const context = useContext(sharedData);

    const chartData = [[xLabel, yLabel], ...data];

    const chartOptions = chartModeList(chartMode, "Focus Chart");

    return (
        <div id="focus_chart" className="mx-auto w-full text-center py-3 bg-white rounded ">
            <Chart
                chartType="LineChart"
                options={chartOptions}
                data={chartData}
                width="100%"
                legendToggle
            />
        </div>
    );
};

export default FocusChart;