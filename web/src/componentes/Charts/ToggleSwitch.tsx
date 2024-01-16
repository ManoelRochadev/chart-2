
const ToggleSwitch = ({ SwitchLabel, SwitchName, ToggleFunction }: any) => {
    return (
        <div className="justify-self-center">
            <label
                className="font-semibold align-middle text-sm md:text-lg"
            >
                <input
                    type="checkbox"
                    className="toggle -mr-2 mb-7"
                    id={`switch-${SwitchName}`}
                    onClick={ToggleFunction}
                    defaultChecked
                />
                {SwitchLabel}
            </label>
        </div >
    );
}

export default ToggleSwitch;