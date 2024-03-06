import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";
import { useState } from "react";
import OptionHint from "./OptionHint";

const CheckpointerOptions = ({ onEdited }: any) => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Checkpointer" hintIcon={<OptionHint>hey!</OptionHint>}>
            <div className="col-span-full flex justify-around">
                <SwitchInput SwitchName="checkpointState" onSwitchCheck={() => { setEdited(true); onEdited(CheckpointerOptions.name) }}>
                    Checkpoint
                </SwitchInput >
                <SwitchInput SwitchName="checkpointsOnlyMfu" onSwitchCheck={() => { setEdited(true); onEdited(CheckpointerOptions.name) }}>
                    Only MFU
                </SwitchInput>
            </div>
            <RangeInput RangeName="numberCheckpoints" onRangeInput={() => { setEdited(true); onEdited(CheckpointerOptions.name) }}>
                Checkpoints quantity
            </RangeInput>
            <RangeInput RangeName="checkpointTimeInterval" onRangeInput={() => { setEdited(true); onEdited(CheckpointerOptions.name) }} >
                Time interval
            </RangeInput>
            <SwitchInput SwitchName="selftuneCheckpointTimeInterval" onSwitchCheck={() => { setEdited(true); onEdited(CheckpointerOptions.name) }} >
                Self tune time interval
            </SwitchInput>
        </OptionsBoard>
    )
}

export default CheckpointerOptions;