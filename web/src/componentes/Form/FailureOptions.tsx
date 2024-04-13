import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { RangeInput } from "./InputTypes";
import OptionHint from "./OptionHint";

const FailureOptions = ({ onEdited }: any) => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Failure simulation"  hintIcon={<OptionHint>hey!</OptionHint>}>
            <RangeInput RangeName="restartDaleyTime" onRangeInput={() => { setEdited(true); onEdited(FailureOptions.name) }}>
                Restart delay time
            </RangeInput>
            <RangeInput RangeName="restartAfterTime" onRangeInput={() => { setEdited(true); onEdited(FailureOptions.name) }}>
                Restart after time
            </RangeInput>
            <RangeInput RangeName="numberRestartsAfterTime" onRangeInput={() => { setEdited(true); onEdited(FailureOptions.name) }} >
                Restarts after time
            </RangeInput>
            <RangeInput RangeName="preloadDatabaseAndRestart" onRangeInput={() => { setEdited(true); onEdited(FailureOptions.name) }}>
                Preload database
            </RangeInput>
            <RangeInput RangeName="numberRestartsAfterPreloading" onRangeInput={() => { setEdited(true); onEdited(FailureOptions.name) }}>
                Restarts after preloading
            </RangeInput>
        </OptionsBoard>
    )
}

export default FailureOptions;