import { useState } from "react";
import CpuOptions from "./CpuOptions";
import TransferOptions from "./TrasferOptions";

interface FormProp {
    initServer: (params: Array<string>) => void;
}

const FormController = ({ initServer }: FormProp) => {
    const [cpuOptionsVisibility, setCpuOptionsVisibility] =
        useState<boolean>(false);
    const [transferOptionsVisibility, setTransferOptionsVisibility] =
        useState<boolean>(false);

    const showCpuOptions = () => {
        setCpuOptionsVisibility(!cpuOptionsVisibility);
    };

    const showTransferOptions = () => {
        setTransferOptionsVisibility(!transferOptionsVisibility);
    };

    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(...Object.keys(formJson));
        initServer(Object.keys(formJson));
    }

    return (
        <div className="container form-controller-panel">
            <div className="card">
                <h3 className="card-header text-light">BENCHMARK</h3>
                <div className="card-body rounded">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="row justify-content-center text-center">
                            <div className="col-auto">
                                <p className="display-6">GRÁFICOS</p>
                                <div className="row justify-content-center">
                                    <div className="col-auto">
                                        <input
                                            id="check-cpu"
                                            onClick={showCpuOptions}
                                            type="checkbox"
                                            name="graph-cpu"
                                            className="chart_option btn btn-check cpu-checkbox me-1"
                                            autoComplete="off"
                                        />
                                        <label
                                            className="h5 border border-2 border-info rounded p-2"
                                            htmlFor="check-cpu"
                                        >
                                            CPU
                                        </label>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            id="check-transfer"
                                            onClick={showTransferOptions}
                                            type="checkbox"
                                            name="graph-transf"
                                            className="chart_option btn btn-check me-1"
                                            autoComplete="off"
                                        />
                                        <label
                                            className="h5 border border-2 border-info rounded p-2"
                                            htmlFor="check-transfer"
                                        >
                                            TRANSIÇÕES
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center mb-3">
                            <div className="col-auto">
                                {cpuOptionsVisibility && <CpuOptions />}
                            </div>
                            <div className="col-auto">
                                {transferOptionsVisibility && (
                                    <TransferOptions />
                                )}
                            </div>
                        </div>

                        <div className=" row justify-content-center panel-buttons">
                            <div className="col-auto">
                                <button
                                    className="btn btn-primary me-3"
                                    type="reset"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Start
                                </button>
                            </div>
                        </div>
                        {/* <button onClick={()=>{initServer('')}} className="btn btn-success me-3">Start</button> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

// redisHostname = "127.0.0.1",
// redisPort = 6379,

export default FormController;
