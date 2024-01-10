
const ResetButton = ({ onResetButtonClick }: any) => {
    return (
        <div
            className={`w-32 py-1 bg-blue-500 rounded-lg text-center text-slate-50 font-semibold `}
        >
            <button onClick={onResetButtonClick}>RESET</button>
        </div>
    );
};

export default ResetButton;
