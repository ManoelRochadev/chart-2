import { useEffect, useState, useContext } from "react";
import { Chart } from "react-google-charts";
import { chartModeList } from "./ChartFunctions"
import { sharedData } from "./ChartContext";
import Loading from "./Loading"




const FocusChart = () => {
    const context = useContext(sharedData);

    return (
        <div id="focus_chart" className="mx-auto w-full text-center py-3 bg-white rounded ">
            <Chart
                chartType="LineChart"
                options={context.config.get()}
                data={context.data.get()}
                width="100%"
                legendToggle
            />
        </div>
    );
};

export default FocusChart;