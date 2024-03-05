import { JSX, JSXElementConstructor, useState, createElement } from "react";
import IndexerOptions from "./IndexerOptions";
import CheckpointerOptions from "./CheckpointerOptions";
import FailureOptions from "./FailureOptions";
import MemtierOptions from "./MemtierOptions";
import ReportOptions from "./ReportOptions";
import SystemMonitoringOptions from "./SystemMonitoringOptions";
import ResetButton from "./ResetFormButton";
import StartButton from "./StartButton";
import systemMonitoringOptions from "./SystemMonitoringOptions";
import OptionSelectorButton from "./OptionSelectorButton";

const SetupForm = ({ submitFunction, resetFunction }: any) => {
    let i = 0
    // let c = 0
    const [selectedPanels, setSelectedPanels] = useState<string[]>([IndexerOptions.name]);
    const [editedPanels, setEditedPanels] = useState<string[]>([IndexerOptions.name]);

    const options: any[] = [
        IndexerOptions,
        CheckpointerOptions,
        FailureOptions,
        MemtierOptions,
        ReportOptions,
        SystemMonitoringOptions
    ]

    const renderedOptions = options.map(
        (chartOption: any) => (
            <div key={i++} className={selectedPanels.includes(chartOption.name) ? "w-full md:w-[48%]" : "hidden"}>{createElement(chartOption)}</div>
        ))

    const filterVisiblePanels = (panelName: string, selectedIndicator: any) => {
        if (selectedPanels.includes(panelName)) { return }

        setSelectedPanels([
            ...selectedPanels.filter((panel) => editedPanels.includes(panel)),
            panelName
        ])
        if (selectedPanels.includes(panelName) || editedPanels.includes(panelName)) {selectedIndicator(true)}else{selectedIndicator(false)}
        console.log(selectedPanels)

     
    }


    return (
        <form>
            <div className="grid grid-cols-6 gap-2 justify-center w-full pt-2 pb-1 px-4">
                <OptionSelectorButton target={IndexerOptions} onButtonClick={filterVisiblePanels} editedByDefault={true} >Indexer</OptionSelectorButton>
                <OptionSelectorButton target={CheckpointerOptions} onButtonClick={filterVisiblePanels} >Checkpointer</OptionSelectorButton>
                <OptionSelectorButton target={FailureOptions} onButtonClick={filterVisiblePanels} >Failure</OptionSelectorButton>
                <OptionSelectorButton target={MemtierOptions} onButtonClick={filterVisiblePanels} >Memtier</OptionSelectorButton>
                <OptionSelectorButton target={ReportOptions} onButtonClick={filterVisiblePanels} >Report</OptionSelectorButton>
                <OptionSelectorButton target={SystemMonitoringOptions} onButtonClick={filterVisiblePanels} >System</OptionSelectorButton>
            </div>
            <div className="flex flex-col md:flex-row md:flex-wrap flex-grow place-content-around place-items-center max-h-[75vh] min-h-[60vh]: md:max-h-full px-4 py-2 overflow-y-auto overflow-x-hidden  lg:overflow-hidden">
                {
                    renderedOptions
                }
            </div>
            <div className="flex flex-row justify-center gap-3 mt-3 px-4 pb-3 flex-wrap">
                <ResetButton onResetButtonClick={resetFunction} />
                <StartButton onStartButtonClick={submitFunction} />
            </div>

        </form>
    )
}

export default SetupForm;