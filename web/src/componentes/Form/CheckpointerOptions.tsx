import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";
import { useState } from "react";

const CheckpointerOptions = () => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Checkpointer">
            <div className="flex justify-around">
                <SwitchInput SwitchName="checkpointState" onSwitchCheck={() => setEdited(true)}>
                    Checkpoint
                </SwitchInput >
                <SwitchInput SwitchName="checkpointsOnlyMfu" onSwitchCheck={() => setEdited(true)}>
                    Only MFU
                </SwitchInput>
            </div>
            <RangeInput RangeName="numberCheckpoints" onRangeInput={() => setEdited(true)}>
                Checkpoints quantity
            </RangeInput>
            <RangeInput RangeName="checkpointTimeInterval" onRangeInput={() => setEdited(true)} >
                Time interval
            </RangeInput>
            <SwitchInput SwitchName="selftuneCheckpointTimeInterval" onSwitchCheck={() => setEdited(true)} >
                Self tune time interval
            </SwitchInput>
        </OptionsBoard>
    )
}

export default CheckpointerOptions;