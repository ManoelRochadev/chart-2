const StartButton = ({ onClickButton }: any) => {
    return (
        <div
            className={`w-32 py-1 bg-emerald-600 hover:bg-emerald-500  active:bg-emerald-700 rounded-lg text-center text-slate-50 font-semibold`}
        >
            <button className="w-full h-full" type="submit" onClick={onClickButton}>START</button>
        </div>
    );
};

export default StartButton;
