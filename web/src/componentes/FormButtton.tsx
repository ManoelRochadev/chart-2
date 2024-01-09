const FormButton = ({ children, color }: any) => {
    console.log(children)
    return (
        <div className={`w-32 py-1 bg-${color}-500 rounded-lg text-center text-slate-50 font-semibold `}>
            <button>
                {children}
            </button>
        </div>
    )
}
export default FormButton;