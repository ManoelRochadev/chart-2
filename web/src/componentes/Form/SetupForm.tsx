import ResetButton from "./ResetButton";
import StartButton from "./StartButton";

const SetupForm = ({ children, submitFunction }: any) => {
    return (
        <form>
            <div className="flex flex-row justify-between px-4 py-2 flex-wrap">
                {children}
            </div>
            <div className="flex flex-row justify-center gap-3 px-4 py-2 flex-wrap">
                <ResetButton />
                <StartButton />
            </div>
            {/* SUBMIT BUTTON */}
        </form>
    )
}

export default SetupForm;