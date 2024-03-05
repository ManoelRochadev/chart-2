import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";

const SystemMonitoringOptions = ({ onEdited }: any) => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="System monitoring">
            <div className="flex justify-around flex-wrap gap-2">
                <SwitchInput SwitchName="systemMonitoring"
                    onSwitchCheck={() => { setEdited(true); onEdited(SystemMonitoringOptions.name) }}
                >
                    System monitoring
                </SwitchInput>
                <SwitchInput SwitchName="stopSystemMonitoringEndBenchmark"
                    onSwitchCheck={() => { setEdited(true); onEdited(SystemMonitoringOptions.name) }}
                >
                    Stop after Benchmark finish
                </SwitchInput>
            </div>
            <TextInput
                TextName="systemMonitoringCsvFilename"
                TextPlaceholder="arquivo.csv"
                value="system_monitoring/system_monitoring.csv"
                onTextInput={() => { setEdited(true); onEdited(SystemMonitoringOptions.name) }}
            >
                Filename
            </TextInput>
            <RangeInput RangeName="systemMonitoringTimeInterval"
                onRangeInput={() => { setEdited(true); onEdited(SystemMonitoringOptions.name) }}
            >
                Time interval
            </RangeInput>
            <div className="flex justify-around flex-wrap gap-1">
                <SwitchInput SwitchName="overwriteSystemMonitoring"
                    onSwitchCheck={() => { setEdited(true); onEdited(SystemMonitoringOptions.name) }}
                >
                    Overwrite
                </SwitchInput>
            </div>
        </OptionsBoard>
    )
}


export default SystemMonitoringOptions;