import TransferChart from "./TransferChart";
import CpuChart from "./CpuChart";
// import StopButton from "./StopButton";

interface ButtonProp {
    stopChart: () => void;
}

const ChartBoard = ({stopChart}: ButtonProp) => {
    return (
        <div className="container chart-board">
            <TransferChart />
            <CpuChart />
            {/* <StopButton /> */}
            <button onClick={stopChart} className="btn btn-warning me-3">STOP</button>

        </div>
    );
}

export default ChartBoard;