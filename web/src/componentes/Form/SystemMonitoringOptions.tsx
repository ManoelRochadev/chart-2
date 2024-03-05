import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";

const systemMonitoringOptions = () => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="System monitoring">
            <div className="flex justify-around flex-wrap gap-2">
                <SwitchInput SwitchName="systemMonitoring"
                    onSwitchCheck={() => setEdited(true)}
                >
                    System monitoring
                </SwitchInput>
                <SwitchInput SwitchName="stopSystemMonitoringEndBenchmark"
                    onSwitchCheck={() => setEdited(true)}
                >
                    Stop after Benchmark finish
                </SwitchInput>
            </div>
            <TextInput
                TextName="systemMonitoringCsvFilename"
                TextPlaceholder="arquivo.csv"
                value="system_monitoring/system_monitoring.csv"
                onTextInput={() => setEdited(true)}
            >
                Filename
            </TextInput>
            <RangeInput RangeName="systemMonitoringTimeInterval"
                onRangeInput={() => setEdited(true)}
            >
                Time interval
            </RangeInput>
            <div className="flex justify-around flex-wrap gap-1">
                <SwitchInput SwitchName="overwriteSystemMonitoring"
                    onSwitchCheck={() => setEdited(true)}
                >
                    Overwrite
                </SwitchInput>
            </div>
        </OptionsBoard>
    )
}


export default systemMonitoringOptions;