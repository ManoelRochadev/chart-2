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
                className="pl-3 h-2 p-0 basis-full rounded"
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
    return (
        <div className="w-full">
            <label htmlFor={`switch-${SwitchName}`}
                className="font-semibold align-middle"
            >
                <input
                    type="checkbox"
                    className="toggle -mr-2 mb-7"
                    name={SwitchName}
                    id={`switch-${SwitchName}`}
                />
                {children}
            </label>
        </div>
    )
}

export const RangeInput = ({ RangeName, children }: any) => {
    return (
        <div>
            <label htmlFor={`switch-${RangeName}`}
                className="flex items-center font-semibold align-middle  text-sm"
            >
                {children}
                <input
                    type="range"
                    name={RangeName}
                    id={`switch-${RangeName}`}
                    className="w-72 flex-auto ml-2 mr-3 h-2 rounded-lg cursor-pointer"
                />
            </label>
        </div>
    )
}
