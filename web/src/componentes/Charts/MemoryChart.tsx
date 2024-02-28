//import { useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { chartModeList } from "./ChartFunctions"
//import { sharedData } from "./ChartContext";
import Loading from "./Loading"


interface cpuChartProps {
  data: [number, number][];
  chartMode: "default" | "minimalist"
}


const MemoryChart = ({chartMode , data }: cpuChartProps) => {

  //const context = useContext(sharedData);

  // estado para armazenar o maior valor de memória usado
  //const [maxMemoryUsage, setMaxMemoryUsage] = useState(0);

  

  if (data.length === 0) {
    return (
      <Loading />
    );
  }


  const chartData = [["Timestamp ", "Memory Usage"], ...data];

  //const chartOptions: any = chartModeList(chartMode);

  const chartOptions = chartModeList(chartMode, "Memory Usage");


  // if (context.selectedChart === MemoryChart.name) {
  //   setContext({ selectedChart: MemoryChart.name, data: chartData, config: chartOptions })
  // }


  return (
    <div
    id="Memory_chart"
    className="mx-auto text-center pt-3 pb-1 bg-white rounded-lg  border-2 border-blue-700  "
    // onClick={() => setContext({ selectedChart: "CpuChart", data: chartData, config: chartOptions })}
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
