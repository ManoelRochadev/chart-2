import { useState } from "react";

const CpuOptions = () => {
    const [value, setValue] = useState(0);

    const rangeValue = (event: any) => {
        setValue(event.currentTarget.value);
    };
    return (
        <div className="card cpu-options mx-1 p-3">
            <div className="col-auto">
                <h3 className="text-center">CPU</h3>
                <select className="form-select" name="drop">
                    <option selected>PARÂMETROS</option>
                    <option value="1">Opção 1</option>
                    <option value="2">Opção 2</option>
                    <option value="3">Opção 3</option>
                </select>
            </div>

            <div className="col-auto mt-3">
                <label htmlFor="customRange2" className="form-label">
                    Range
                </label>
                <div className="row my-3">
                    <input
                        type="range"
                        className="form-range w-75 px-2"
                        onInput={rangeValue}
                        defaultValue={0}
                        min="0"
                        max="5"
                        id="customRange2"
                    />
                    <div className="card col-auto ms-3 text-center">
                        <span>{value}</span>
                    </div>
                </div>
            </div>

            <div className="col-auto">
                <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="check-1"
                />
                <label className="form-check-label me-3"> Opção 1 </label>
                <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="check-2"
                />
                <label className="form-check-label me-3"> Opção 2 </label>
                <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="check-3"
                />
                <label className="form-check-label me-3"> Opção 3 </label>
            </div>
        </div>
    );
};

export default CpuOptions;
