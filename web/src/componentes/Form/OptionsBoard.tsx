const OptionsBoard = ({ children }: any) => {
    return (
        <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-md h-64 py-3 px-7 mx-auto my-3 bg-slate-50 rounded-lg shadow-md justify-center">
            {children}
        </div>
    );
};

export default OptionsBoard;
