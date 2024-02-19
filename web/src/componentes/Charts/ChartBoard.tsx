import { useState, createContext } from "react";
import CpuChart from "./CpuChart";
import TransferChart from "./TransferChart";
import MemoryChart from "./MemoryChart";
import FocusChart from "./FocusChart";
import TerminalController from "../TerminalController";
import ToggleSwitch from "./ToggleSwitch";
import ReloadButton from "../ReloadButton";

const data = createContext<string>("")

const ChartBoard = ({
    cpuChart,
    transferChart,
    terminalLog,
    onReloadButtonClick,
}: any) => {
    const [showInsights, setShowInsights] = useState<boolean>(true);
    const [showTerminal, setShowTerminal] = useState<boolean>(true);
    const [focusChartData, setFocusChartData] = useState<[number, number][]>([]);
    const [focusChartConfig, setFocusChartConfig] = useState<any>();



    const ToggleTargetComponent = (targetValue: any, setTargetValue: any) => {
        setTargetValue(!targetValue)
    };

    const updateFocusChart = (data: any, setFunction: any) => {
        setFunction(data);
    }
    const click = (data: any) => {
        updateFocusChart(data, setFocusChartData);
    }

    return (
        <div className="grid grid-cols-2 gap-y-5 w-[95%] mx-auto my-8 p-4 bg-slate-200 rounded">
            
            <ToggleSwitch SwitchLabel="Charts" SwitchName="toggle-scharts" ToggleFunction={() => { ToggleTargetComponent(showInsights, setShowInsights) }} />
            <ToggleSwitch SwitchLabel="Terminal" SwitchName="toggle-terminal" ToggleFunction={() => { ToggleTargetComponent(showTerminal, setShowTerminal) }} />


            <div className={`grid grid-cols-4 col-span-2 gap-2`}>

                <data.Provider value={'a'}>
                    <div className="space-y-3">
                        <div id="chart_1" className={`${showInsights || 'hidden'}`}>
                            {cpuChart && <CpuChart chartMode="minimalist" onChartClick={click} />}
                        </div>
                        <div id="chart_2" className={`${showInsights || 'hidden'}`}>
                            {transferChart && <TransferChart chartMode="minimalist" onChartClick={click} />}
                        </div>
                        <div id="chart_3" className={`${showInsights || 'hidden'}`}>
                            {transferChart && <MemoryChart chartMode="minimalist" onChartClick={click} />}
                        </div>
                    </div>

                    <div className={` bg-slate-500 col-span-3 ${showInsights || 'hidden'}`}>
                        <FocusChart ChartData={focusChartData} ChartOptions={{
                            hAxis: {
                            },
                            vAxis: {

                            },
                            legend: { position: 'bottom', textStyle: { color: 'blue', fontSize: 14 } }
                        }} />
                    </div>
                </data.Provider>

                {!showInsights &&
                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" col-span-full justify-self-center w-32 h-32 stroke-slate-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                    </svg>)
                }

            </div>



            <div className="grid grid-cols-subgrid  col-span-2 w-4/5">
                <div className={` justify-self-center col-span-2 w-4/5 ${showTerminal || 'hidden'}`}>
                    <TerminalController value={terminalLog} />
                </div>
                {!showTerminal &&
                    (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" col-span-2 justify-self-center w-32 h-32 stroke-slate-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>)
                }

            </div>

            <ReloadButton onButtonClick={onReloadButtonClick} />
        </div>
    );
};

export default ChartBoard;
