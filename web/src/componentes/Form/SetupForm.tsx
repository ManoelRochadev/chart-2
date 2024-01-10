import ResetButton from "./ResetButton";
import StartButton from "./StartButton";

const SetupForm = ({ children, submitFunction, resetFunction }: any) => {
    return (
        <form>
            <div className="max-h-[75vh] md:max-h-full overflow-auto lg:overflow- scroll flex flex-row justify-between px-4 py-2 flex-wrap">
                {children}
            </div>
            <div className="flex flex-row justify-center gap-3 mt-3 px-4 pb-3 flex-wrap">
                <ResetButton onResetButtonClick={resetFunction} />
                <StartButton onClickButton={submitFunction} />
            </div>

        </form>
    )
}

export default SetupForm;