const reloadButton = ({ onButtonClick }: any) => {
    return (
        <div className="col-span-2 w-32 mx-auto py-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg text-center text-slate-50 font-semibold">
            <button className=" h-full w-full" onClick={onButtonClick}>
                RETURN
            </button>
        </div>
    );
};

export default reloadButton;
