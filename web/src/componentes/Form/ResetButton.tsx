
const ResetButton = ({ onResetButtonClick }: any) => {
    return (
        <div
            className={`w-32 py-1 self-start bg-blue-600  hover:bg-blue-400 active:bg-blue-700 rounded-lg text-center text-slate-50 font-semibold`}
        >
            <button className="w-full h-full" onClick={onResetButtonClick}>RESET</button>
        </div>
    );
};

export default ResetButton;
