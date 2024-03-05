import { useState } from "react";


interface OptionSelectorButtonProps {
    children: any,
    target: any,
    onButtonClick: any,
    editedByDefault?: boolean
}


const OptionSelectorButton = ({ children, target, onButtonClick, editedByDefault = false }: OptionSelectorButtonProps) => {
    const [selected, setSelected] = useState<boolean>(editedByDefault);

    const clickFuntion = (e: any) => {
        e.preventDefault();

        onButtonClick(target.name, setSelected)
    }

    return (
        <button id={target.name}
            onClick={clickFuntion}
            className={`w-full ${selected? "bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800":"bg-slate-400 hover:bg-slate-500 focus:bg-slate-600 active:bg-slate-700"} rounded-md font-mono font-semibold focus:underline`}
        >
            {children}
        </button>
    )
}

export default OptionSelectorButton;