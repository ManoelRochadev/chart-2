const StartButton = ({ onClickButton }: any) => {
    return (
        <div
            className={`w-32 py-1 bg-emerald-600 rounded-lg text-center text-slate-50 font-semibold `}
        >
            <button onClick={onClickButton}>START</button>
        </div>
    );
};

export default StartButton;
