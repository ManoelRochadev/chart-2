import { useState } from "react";
import CpuOptions from "./CpuOptions";
import TransferOptions from "./TrasferOptions";


interface FormProp {
    initServer: (params: Array<string>) => void;
}

const FormController = ({ initServer }: FormProp) => {

    const [cpuOptionsVisibility, setCpuOptionsVisibility] = useState<boolean>(false)
    const [transferOptionsVisibility, setTransferOptionsVisibility] = useState<boolean>(false)

    const showCpuOptions = (event: any) => {
        setCpuOptionsVisibility(!cpuOptionsVisibility)
    }

    const showTransferOptions = (event: any) => {
        setTransferOptionsVisibility(!transferOptionsVisibility)
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(...Object.keys(formJson));
        initServer(Object.keys(formJson));
    }

    return (
        <div>
            <div className="container form-controller-panel">
                <div className="card">
                    <h3 className="card-header text-light">MM-DIRECT</h3>
                    <div className="card-body">
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="row justify-content-center text-center">
                                <div className="col-auto">

                                    <p className="display-6">GRAFICOS </p>
                                    <div className="row mb-3">
                                        <div className="col-auto">
                                            <div className="cpu-select">
                                                <input
                                                    id="btn-cpu"
                                                    onClick={showCpuOptions}
                                                    type="checkbox"
                                                    name="graph-cpu"
                                                    className="btn-check cpu-checkbox"
                                                    autoComplete="off"
                                                />
                                                <label className="btn border border-info border-2" htmlFor="btn-cpu">
                                                    CPU
                                                </label>
                                                {
                                                    cpuOptionsVisibility && <CpuOptions />
                                                }
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <input
                                                id="btn-transfer"
                                                onClick={showTransferOptions}
                                                type="checkbox"
                                                name="graph-transf"
                                                className="btn-check"
                                                autoComplete="off"
                                            />
                                            <label  className="btn border border-info border-2" htmlFor="btn-transfer">
                                                TRANSIÇÕES
                                            </label>
                                            {
                                                transferOptionsVisibility && <CpuOptions />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="col-3">
                <select className="form-select" name="drop">
                    <option selected>PARÂMETROS</option>
                    <option value="1">Opção 1</option>
                    <option value="2">Opção 2</option>
                    <option value="3">Opção 3</option>
                </select>
            </div>


            <div className="col-4">
                <label htmlFor="customRange2" className="form-label">Range</label>
                <input type="range" className="form-range" min="0" max="5" id="customRange2" />
            </div>

            <div className="col-auto">
                <input className="form-check-input" type="checkbox" name="check-1" />
                <label className="form-check-label me-3"> Opção 1 </label>
                <input className="form-check-input" type="checkbox" name="check-2" />
                <label className="form-check-label me-3"> Opção 2 </label>
                <input className="form-check-input" type="checkbox" name="check-3" />
                <label className="form-check-label me-3"> Opção 3 </label>
            </div> */}
                            <div className=" row justify-content-center panel-buttons">
                                <div className="col-auto">
                                    <button
                                        className="btn btn-primary me-3"
                                        type="reset"
                                    >
                                        Reset
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        Start
                                    </button>
                                </div>
                            </div>
                            {/* <button onClick={()=>{initServer('')}} className="btn btn-success me-3">Start</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FormController;
