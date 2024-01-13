import { useState } from "react";
import CpuChart from "./CpuChart";
import TransferChart from "./TransferChart";
import TerminalController from "../TerminalController";
import ReloadButton from "../ReloadButton";

const ChartBoard = ({
    cpuChart,
    transferChart,
    terminalLog,
    onReloadButtonClick,
}: any) => {
    const [showInsights, setShowInsights] = useState<boolean>(true);
    const [showTerminal, setShowTerminal] = useState<boolean>(true);

    return (
        <div className="grid grid-cols-2 gap-y-5 w-[95%] mx-auto my-8 p-4 bg-slate-200 rounded">
            {showInsights && (
                <div className="grid grid-cols-subgrid col-span-2 gap-7 justify-center content-center">
                    {cpuChart && <CpuChart />}
                    {transferChart && <TransferChart />}
                </div>
            )}
            {showTerminal && <TerminalController value={terminalLog} />}
            <ReloadButton onButtonClick={onReloadButtonClick} />
        </div>
    );
};

export default ChartBoard;
