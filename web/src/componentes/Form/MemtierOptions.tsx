import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";
import OptionHint from "./OptionHint";

const MemtierOptions = ({ onEdited }: any) => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Memtier Benchmark"  hintIcon={<OptionHint>hey!</OptionHint>} >
            <div className="col-span-full flex justify-around">
                <SwitchInput SwitchName="memtierBenchmarkState" onSwitchCheck={() => { setEdited(true); onEdited(MemtierOptions.name) }} >
                    Memtier Benchmark
                </SwitchInput>
            </div>
            <TextInput
                TextName="memtierBenchmarkParameters"
                TextPlaceholder="--hide-histogram -n 5000 ..."
                value=" --hide-histogram -n 5000 --key-prefix='redisIR-' --key-minimum=1 --key-maximum=5000 --command='set  __key__ __data__' --command-ratio=5000 --command-key-pattern=S"
                onTextInput={() => { setEdited(true); onEdited(MemtierOptions.name) }}
            >
                Parameters
            </TextInput>
            <RangeInput RangeName="timeTostopBenchmarking" onRangeInput={() => { setEdited(true); onEdited(MemtierOptions.name) }} >
                Time to stop
            </RangeInput>
        </OptionsBoard>
    )
}

export default MemtierOptions;