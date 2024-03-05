import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";

const MemtierOptions = () => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Memtier Benchmark" >
            <div className="flex justify-around">
                <SwitchInput SwitchName="memtierBenchmarkState" onSwitchCheck={() => setEdited(true)} >
                    Memtier Benchmark
                </SwitchInput>
            </div>
            <TextInput
                TextName="memtierBenchmarkParameters"
                TextPlaceholder="--hide-histogram -n 5000 ..."
                value=" --hide-histogram -n 5000 --key-prefix='redisIR-' --key-minimum=1 --key-maximum=5000 --command='set  __key__ __data__' --command-ratio=5000 --command-key-pattern=S"
                onTextInput={() => setEdited(true)}
            >
                Parameters
            </TextInput>
            <RangeInput RangeName="timeTostopBenchmarking" onRangeInput={() => setEdited(true)} >
                Time to stop
            </RangeInput>
        </OptionsBoard>
    )
}

export default MemtierOptions;