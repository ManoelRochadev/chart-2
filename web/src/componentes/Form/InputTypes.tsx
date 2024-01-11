import { useState } from "react";


export const TextInput = ({ TextName, TextPlaceholder, children }: any) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={`switch-${TextName}`}
                className="font-semibold text-sm"
            >
                {children}
            </label>
            <input
                type="text"
                name={TextName}
                id={`switch-${TextName}`}
                className="pl-3 h-2 p-0.5 basis-full rounded"
                placeholder={TextPlaceholder}
            />
        </div>
    )
}

export const CheckboxInput = ({ CheckboxName, children }: any) => {
    return (
        <div className="w-full">
            <label htmlFor={`switch-${CheckboxName}`}
                className="font-semibold align-middle"
            >
                <input
                    type="checkbox"
                    name={CheckboxName}
                    id={`switch-${CheckboxName}`}
                    className="form-checkbox ml-2 mr-2 mb-0.5 rounded cursor-pointer"
                />
                {children}
            </label>
        </div>
    )
}

export const SwitchInput = ({ SwitchName, children }: any) => {
    const [enableBoardButton, setEnableBoardButton] = useState<boolean>(true);
    return (
        <div className="w-full">
            <label htmlFor={`switch-${SwitchName}`}
                className="font-semibold align-middle text-sm md:text-lg"
            >
                <input
                    type="checkbox"
                    className="toggle -mr-2 mb-7"
                    name={SwitchName}
                    id={`switch-${SwitchName}`}
                    onClick={() => {
                        setEnableBoardButton(!enableBoardButton);
                        console.log(enableBoardButton);
                    }}
                />
                {children}
            </label>
        </div>
    )
}

export const RangeInput = ({ RangeName, RangeDefault = 0, RangeMin = 0, RangeMax = 100, RangeSteps = 1, children }: any) => {
    const [inputValue, setInputValue] = useState<string>(RangeMin)
    return (
        <div>
            <label htmlFor={`switch-${RangeName}`}
                className="flex items-center font-semibold align-middle text-xs"
            >
                <div className="w-[10vw]">
                    {children}
                </div>
                <input
                    type="range"
                    name={RangeName}
                    id={`switch-${RangeName}`}
                    className="w-full flex-auto ml-2 mr-3 h-2 rounded-lg cursor-pointer"
                    defaultValue={RangeDefault}
                    min={RangeMin}
                    max={RangeMax}
                    step={(RangeSteps & (RangeMin & RangeMax)) && RangeSteps < RangeMax ? RangeSteps : 1}
                    onInput={(e:any) => {
                        setInputValue(`${e.target.value}`);

                    }}

                />

                <div className="h-full w-20 rounded border-slate-500 border-2 grow-0 text-center align-bottom">
                    {inputValue}
                </div>

            </label>
        </div>
    )
}
