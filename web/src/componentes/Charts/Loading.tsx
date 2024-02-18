
const Loading = () => {
    return (
        <div className="flex flex-row top-0 w-full h-full pointer-events-none">
            <div className="h-fit sm:w-[90vw] md:w-full max-w-xl sm:max-w-lg md:max-w-2xl lg:max-w-lg py-10 px-7 mx-auto my-auto space-y-5 bg-slate-300 rounded-lg shadow-md text-center">
                <p className="animate-pulse text-slate-800 text-lg font-mono">
                    loading...
                </p>
            </div>
        </div>
    )
}

export default Loading;