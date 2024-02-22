import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";

const MemtierOptions = () => {
    return (
        <OptionsBoard BoardHeader="Memtier Benchmark">
            <div className="flex justify-around">
                <SwitchInput SwitchName="memtierBenchmarkState">
                    Memtier Benchmark
                </SwitchInput>
            </div>
            <TextInput
                TextName="memtierBenchmarkParameters"
                TextPlaceholder="--hide-histogram -n 5000 ..."
                value=" --hide-histogram -n 5000 --key-prefix='redisIR-' --key-minimum=1 --key-maximum=5000 --command='set  __key__ __data__' --command-ratio=5000 --command-key-pattern=S"
            >
                Parameters
            </TextInput>
            <RangeInput RangeName="timeTostopBenchmarking">
                Time to stop
            </RangeInput>
        </OptionsBoard>
    )
}

export default MemtierOptions;