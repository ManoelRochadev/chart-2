import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { RangeInput } from "./InputTypes";

const FailureOptions = () => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Failure simulation">
            <RangeInput RangeName="restartDaleyTime" onRangeInput={() => setEdited(true)}>
                Restart delay time
            </RangeInput>
            <RangeInput RangeName="restartAfterTime" onRangeInput={() => setEdited(true)}>
                Restart after time
            </RangeInput>
            <RangeInput RangeName="numberRestartsAfterTime" onRangeInput={() => setEdited(true)} >
                Restarts after time
            </RangeInput>
            <RangeInput RangeName="preloadDatabaseAndRestart" onRangeInput={() => setEdited(true)}>
                Preload database
            </RangeInput>
            <RangeInput RangeName="numberRestartsAfterPreloading" onRangeInput={() => setEdited(true)}>
                Restarts after preloading
            </RangeInput>
        </OptionsBoard>
    )
}

export default FailureOptions;