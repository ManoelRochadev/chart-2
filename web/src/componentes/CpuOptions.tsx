import { useState } from "react";

const CpuOptions = () => {
    const [value, setValue] = useState(5);

    const rangeValue = (event: any) => {
        setValue(event.target.value);
    };
    return (
        <div className="card cpu-options mx-1 py-3 px-4">
            <div className="col-auto">
                <h3 className="text-center">CPU</h3>
                <label htmlFor="cpu_file_name_input" className="form-label">
                    Nome do arquivo
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cpu_file_name_input"
                    name="cpu_file_name_input"
                    placeholder="system_cpu"
                />
            </div>

            <div className="col-auto mt-3">
                <label htmlFor="cpu_interval" className="form-label">
                    Intervalo
                </label>
                <div className="row my-3">
                    <input
                        type="range"
                        className="form-range w-75 px-2"
                        onInput={rangeValue}
                        defaultValue={5}
                        min="5"
                        max="60"
                        step={5}
                        id="cpu_interval"
                        name="systemMonitoringTimeInterval"
                    />
                    <div className="card col ms-3 text-center">
                        <span>{value}s</span>
                    </div>
                </div>
            </div>

            <div className="col-auto">
                <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="stopSystemMonitoringEndBenchmark"
                />
                <label className="form-check-label me-3">
                    STOP MONITORING AT END
                </label>
                <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name="overwriteSystemMonitoring"
                />
                <label className="form-check-label me-3"> OVERWRITE </label>
            </div>
        </div>
    );
};

// systemMonitoring = "OFF",
// stopSystemMonitoringEndBenchmark = "ON",
// systemMonitoringCsvFilename = "system_monitoring/system_monitoring.csv",
// systemMonitoringTimeInterval = 10,
// overwriteSystemMonitoring = "ON"

export default CpuOptions;
