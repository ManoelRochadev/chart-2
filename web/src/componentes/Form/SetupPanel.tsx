import SetupForm from "./SetupForm";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";

interface FormProp {
    initServer: (params: Array<string>) => void;
}

const SetupPanel = ({ initServer }: FormProp) => {
    function onSubmitButtonPressed(e: any) {
        e.preventDefault();

        const form = e.target.form;
        const formData = new FormData(form);

        const responseJson: object = {};

        for (const [key, value] of formData) {
            console.log(key, value)
            Object.defineProperty(
                responseJson, key, { value: value, writable: true }
            )
        }
        
        
        // console.log(Object.entries(responseJson));
        // console.log(JSON.stringify(responseJson));
        // console.log(...formData.entries());
        // const postRequest = fetch("http://localhost:8081/config", {
        //     method: "POST",
        //     body: JSON.stringify(responseJson),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // });

        // postRequest.then((response) => { response.json }).then((json) => { console.log(json) });
        // const response = new XMLHttpRequest();

        // response.open("POST", "/config", true);
        // response.send(responseJson)
    }

    function ResetFunction() {
        // do something
    }

    return (
        <div className="grid container mx-auto my-8 justify-center ">
            <div className="flex w-[90vw] bg-my_blue rounded-t py-3 px-4 justify-center">
                <h2 className="text-2xl text-slate-100">Setup</h2>
            </div>
            <div className="w-[90vw] bg-slate-200 rounded-b">
                <SetupForm submitFunction={onSubmitButtonPressed} resetFunction={ResetFunction}>
                    <OptionsBoard BoardHeader="Indexer">
                        <div className="flex justify-around">
                            <SwitchInput SwitchName='instantRecoveryState'>Instant Recovery</SwitchInput>
                            <SwitchInput SwitchName='instantRecoverySynchronous'>Synchronous</SwitchInput>
                        </div>
                        <TextInput TextName="aofFilename" TextPlaceholder="arquivo.aof">AOF filename</TextInput>
                        <TextInput TextName="indexedlogFilename" TextPlaceholder="arquivo.txt">indexed log filename</TextInput>
                        <RangeInput RangeName="indexerTimeInterval">Time interval</RangeInput>
                    </OptionsBoard>

                    <OptionsBoard BoardHeader="Checkpointer">
                        <div className="flex justify-around">
                            <SwitchInput SwitchName='checkpointState'>Checkpoint</SwitchInput>
                            <SwitchInput SwitchName='checkpointsOnlyMfu'>Only MFU</SwitchInput>
                        </div>
                        <RangeInput RangeName="numberCheckpoints">Checkpoints quantity</RangeInput>
                        <RangeInput RangeName="checkpointTimeInterval">Time interval</RangeInput>
                        <SwitchInput SwitchName='selftuneCheckpointTimeInterval'>Self tune time interval</SwitchInput>
                    </OptionsBoard>

                    <OptionsBoard BoardHeader="Failure simulation">
                        <RangeInput RangeName="restartDaleyTime">Restart deley time</RangeInput>
                        <RangeInput RangeName="restartAfterTime">Restart after time</RangeInput>
                        <RangeInput RangeName="numberRestartsAfterTime">Restarts after time</RangeInput>
                        <RangeInput RangeName="preloadDatabaseAndRestart">Preload database</RangeInput>
                        <RangeInput RangeName="numberRestartsAfterPreloading">Restarts after preloading</RangeInput>
                    </OptionsBoard>

                    <OptionsBoard BoardHeader="Memtier Benchmark">
                        <div className="flex justify-around">
                            <SwitchInput SwitchName='memtierBenchmarkState'>Memtier Benchmark</SwitchInput>
                        </div>
                        <TextInput TextName="memtierBenchmarkParameters" TextPlaceholder="--hide-histogram -n 5000 ...">Parameters</TextInput>
                        <RangeInput RangeName="timeTostopBenchmarking">Time to stop</RangeInput>
                    </OptionsBoard>

                    <OptionsBoard BoardHeader="Report">
                        <div className="flex justify-around">
                            <SwitchInput SwitchName='generateRecoveryReport'>Recovery</SwitchInput>
                        </div>
                        <TextInput TextName="recoveryReportFilename" TextPlaceholder="arquivo.txt">Recovery filename</TextInput>

                        <div className="flex justify-around">
                            <SwitchInput SwitchName='generateExecutedCommandsCsv'>Executed commands</SwitchInput>
                        </div>
                        <TextInput TextName="executedCommandsCsvFilename" TextPlaceholder="arquivo.csv">Executed commands filename</TextInput>

                        <div className="flex justify-around">
                            <SwitchInput SwitchName='generateIndexingReportCsv'>Indexing</SwitchInput>
                        </div>
                        <TextInput TextName="indexingReportCsvFilename" TextPlaceholder="arquivo.csv">Indexing filename</TextInput>
                        <div className="flex justify-around">
                            <SwitchInput SwitchName='overwriteReportFiles'>Overwrite</SwitchInput>
                        </div>

                    </OptionsBoard>

                    <OptionsBoard BoardHeader="System monitoring">
                        <div className="flex justify-around flex-wrap gap-2">
                            <SwitchInput SwitchName='systemMonitoring'>System monitoring</SwitchInput>
                            <SwitchInput SwitchName='stopSystemMonitoringEndBenchmark'>Stop after Benchmark finish</SwitchInput>
                        </div>
                        <TextInput TextName="systemMonitoringCsvFilename" TextPlaceholder="arquivo.csv">Filename</TextInput>
                        <RangeInput RangeName="systemMonitoringTimeInterval">Time interval</RangeInput>
                        <div className="flex justify-around flex-wrap gap-1">
                            <SwitchInput SwitchName='overwriteSystemMonitoring'>Overwrite</SwitchInput>
                        </div>
                    </OptionsBoard>
                </SetupForm>
            </div>

        </div>
    );
};

export default SetupPanel;
