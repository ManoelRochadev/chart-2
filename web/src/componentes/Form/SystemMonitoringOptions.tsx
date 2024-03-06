import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";
import OptionHint from "./OptionHint";

const SystemMonitoringOptions = ({ onEdited }: any) => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="System monitoring"  hintIcon={<OptionHint>hey!</OptionHint>}>
            <div className="col-span-2 flex justify-around flex-wrap gap-2">
                <SwitchInput SwitchName="systemMonitoring"
                    onSwitchCheck={() => { setEdited(true); onEdited(SystemMonitoringOptions.name) }}
                >
                    System monitoring
                </SwitchInput>
            </div>
            <div className="col-span-2 flex justify-around flex-wrap gap-2">
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
            <div className="col-span-full flex justify-around flex-wrap gap-1">
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