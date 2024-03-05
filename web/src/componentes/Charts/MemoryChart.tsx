//import { useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { chartModeList } from "./ChartFunctions"
//import { sharedData } from "./ChartContext";
import Loading from "./Loading"


interface cpuChartProps {
  data: [number, number][];
  chartMode: "default" | "minimalist"
}


const MemoryChart = ({ chartMode, data }: cpuChartProps) => {

  if (data.length === 0) {
    return (
      <Loading />
    );
  }

  const chartData = [["Timestamp ", "Memory Usage"], ...data];
  const chartOptions = chartModeList(chartMode, "Memory Usage");

  return (
    <div
      id="Memory_chart"
      className="mx-auto text-center pt-3 pb-1 bg-white rounded-lg  border-2 border-blue-700  "
    >
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

export default MemoryChart;
