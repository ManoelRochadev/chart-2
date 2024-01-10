export const TextInput = ({ TextName, children }: any) => {
    return (
        <div className="">
            <label htmlFor={`switch-${TextName}`}
                className="font-semibold align-middle text-sm"
            >
                {children}
            </label>
            <input
                type="text"
                name={TextName}
                id={`switch-${TextName}`}
                className="w-5/6 ml-2 mr-3 h-2 rounded"
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
                    className="toggle -mr-2"
                    name={SwitchName}
                    id={`switch-${SwitchName}`}
                />
                {children}
            </label>
        </div>
    )
}

export const RangeInput = ({ RadioName, children }: any) => {
    return (
        <div className=" ">
            <label htmlFor={`switch-${RadioName}`}
                className="font-semibold align-middle block text-sm"
            >
                {children}
                <input
                    type="range"
                    name={RadioName}
                    id={`switch-${RadioName}`}
                    className="w-5/6  ml-2 mr-3 h-2 rounded-lg cursor-pointer"
                />
            </label>
        </div>
    )
}
