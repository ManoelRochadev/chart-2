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

    const showCpuOptions = (event: any) => {
        setCpuOptionsVisibility(!cpuOptionsVisibility);
    };

    const showTransferOptions = (event: any) => {
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
                <h3 className="card-header text-light">MM-DIRECT</h3>
                <div className="card-body">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="row justify-content-center text-center">
                            <div className="col-auto">
                                <p className="display-6">GRÁFICOS </p>
                                <div className="row">
                                    <div className="col-auto">
                                        <div className="cpu-select">
                                            <input
                                                onClick={showCpuOptions}
                                                type="checkbox"
                                                name="graph-cpu"
                                                className="cpu-checkbox me-1"
                                            />
                                            <label className="h5">CPU</label>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            onClick={showTransferOptions}
                                            type="checkbox"
                                            name="graph-transf"
                                            className="me-1"
                                        />
                                        <label className="h5">TRANSIÇÕES</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center mb-3">
                            <div className="col-auto">
                                {cpuOptionsVisibility && <CpuOptions />}
                            </div>
                            <div className="col-auto">
                                {transferOptionsVisibility && <TransferOptions />}
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
export default FormController;
