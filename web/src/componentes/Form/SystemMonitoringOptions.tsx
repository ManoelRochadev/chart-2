import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";

const systemMonitoringOptions = () => {
    return (
        <OptionsBoard BoardHeader="System monitoring">
            <div className="flex justify-around flex-wrap gap-2">
                <SwitchInput SwitchName="systemMonitoring">
                    System monitoring
                </SwitchInput>
                <SwitchInput SwitchName="stopSystemMonitoringEndBenchmark">
                    Stop after Benchmark finish
                </SwitchInput>
            </div>
            <TextInput
                TextName="systemMonitoringCsvFilename"
                TextPlaceholder="arquivo.csv"
                value="system_monitoring/system_monitoring.csv"
            >
                Filename
            </TextInput>
            <RangeInput RangeName="systemMonitoringTimeInterval">
                Time interval
            </RangeInput>
            <div className="flex justify-around flex-wrap gap-1">
                <SwitchInput SwitchName="overwriteSystemMonitoring">
                    Overwrite
                </SwitchInput>
            </div>
        </OptionsBoard>
    )
}


export default systemMonitoringOptions;