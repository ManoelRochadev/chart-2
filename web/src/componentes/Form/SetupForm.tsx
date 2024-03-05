import { useState } from "react";
import IndexerOptions from "./IndexerOptions";
import CheckpointerOptions from "./CheckpointerOptions";
import FailureOptions from "./FailureOptions";
import MemtierOptions from "./MemtierOptions";
import ReportOptions from "./ReportOptions";
import SystemMonitoringOptions from "./SystemMonitoringOptions";
import ResetButton from "./ResetFormButton";
import StartButton from "./StartButton";
import OptionSelectorButton from "./OptionSelectorButton";

const SetupForm = ({ submitFunction, resetFunction }: any) => {
    let i = 0;

    const [selectedPanels, setSelectedPanels] = useState<string[]>([IndexerOptions.name]);
    const [editedPanels, setEditedPanels] = useState<string[]>([IndexerOptions.name]);

    const options: any[] = [
        IndexerOptions,
        CheckpointerOptions,
        FailureOptions,
        MemtierOptions,
        ReportOptions,
        SystemMonitoringOptions
    ];

    const onOptionEdited = (target: any) => {
        if (editedPanels.includes(target)) return;
        setEditedPanels((previous) => [...previous, target])
    }

    const renderedOptions = options.map(
        (ChartOption: any) => (
            <div key={i++} className={editedPanels.includes(ChartOption.name) || selectedPanels.includes(ChartOption.name) ? "w-full md:w-[48%]" : "hidden"}>
                {<ChartOption onEdited={onOptionEdited} />}
            </div>
        )
    );

    const buttons: any[] = [];
    const labels = ["Indexer", "Checkpointer", "Failure", "Memtier", "Report", "System"]

    const optionClick = (target: any) => {
        setSelectedPanels([...selectedPanels.filter((panel) => editedPanels.includes(panel)), target])

        for (const i of editedPanels) {
            if (editedPanels.includes(target)) return true;
        }
    }

    for (let index = 0; index < options.length; index++) {
        const btn: any = <OptionSelectorButton key={index} target={options[index]} onButtonClick={optionClick} wasEdited={editedPanels.includes(options[index].name)}>
            {labels[index]}
        </OptionSelectorButton>

        buttons.push(btn)
    }

    console.log("selectedPanels ", selectedPanels)
    console.log("editedPanels ", editedPanels)
    console.log(renderedOptions)

    return (
        <form>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 justify-center w-full pt-2 pb-1 px-4">
                {buttons}
            </div>
            <div className="flex flex-col md:flex-row md:flex-wrap flex-grow md:place-content-around place-items-center max-h-[75vh] min-h-[60vh]: md:max-h-full px-4 py-2 overflow-y-auto lg:overflow-hidden">
                {renderedOptions}
            </div>
            <div className="flex flex-row justify-center gap-3 mt-3 px-4 pb-3 flex-wrap">
                <ResetButton onResetButtonClick={resetFunction} />
                <StartButton onStartButtonClick={submitFunction} />
            </div>
        </form>
    )
}

export default SetupForm;