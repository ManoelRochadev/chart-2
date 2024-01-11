import ResetButton from "./ResetButton";
import StartButton from "./StartButton";

const SetupForm = ({ children, submitFunction, resetFunction }: any) => {
    return (
        <form>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 justify-center flex-wrap max-h-[75vh] md:max-h-full px-4 py-2 overflow-auto lg:overflow- scroll ">
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