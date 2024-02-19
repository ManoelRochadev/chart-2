import { useState } from "react";
import { Chart, GoogleChartOptions } from "react-google-charts";


interface FocusChartProps {
    ChartData: any,
    ChartOptions: object
}


const FocusChart = ({ ChartData, ChartOptions }: FocusChartProps) => {
    const data = [["Timestamp ", "Memory Usage"], ...ChartData];

    return (
        <div id="focus_chart" className="mx-auto w-full text-center py-3 bg-white rounded ">
            <Chart
                chartType="LineChart"
                options={ChartOptions}
                data={data}
                width="100%"
                legendToggle
            />
        </div>
    );
};

export default FocusChart;