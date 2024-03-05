import { useState } from "react";


interface OptionSelectorButtonProps {
    children: any,
    target: any,
    onButtonClick: any,
    wasEdited?: boolean
}


const OptionSelectorButton = ({ children, target, onButtonClick, wasEdited = false }: OptionSelectorButtonProps) => {

    const clickFuntion = (e: any) => {
        e.preventDefault();

        onButtonClick(target.name)
    }

    return (
        <button id={target.name}
            onClick={clickFuntion}
            className={`w-full text-xs md:text-base 
            ${wasEdited ? "bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800 border-2 border-sky-100 text-sky-100 shadow-lg " : "bg-slate-400 hover:bg-slate-500 focus:bg-slate-600 active:bg-slate-700 shadow-md"} 
            rounded-md font-mono font-semibold focus:underline`}
        >
            {children}
        </button>
    )
}

export default OptionSelectorButton;