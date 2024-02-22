import OptionsBoard from "./OptionsBoard";
import { RangeInput } from "./InputTypes";

const FailureOptions = () => {
    return (
        <OptionsBoard BoardHeader="Failure simulation">
            <RangeInput RangeName="restartDaleyTime">
                Restart delay time
            </RangeInput>
            <RangeInput RangeName="restartAfterTime">
                Restart after time
            </RangeInput>
            <RangeInput RangeName="numberRestartsAfterTime">
                Restarts after time
            </RangeInput>
            <RangeInput RangeName="preloadDatabaseAndRestart">
                Preload database
            </RangeInput>
            <RangeInput RangeName="numberRestartsAfterPreloading">
                Restarts after preloading
            </RangeInput>
        </OptionsBoard>
    )
}

export default FailureOptions;