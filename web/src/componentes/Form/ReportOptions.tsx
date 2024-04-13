import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput } from "./InputTypes";
import OptionHint from "./OptionHint";

const ReportOptions = ({ onEdited }: any) => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Report"  hintIcon={<OptionHint>hey!</OptionHint>}>
            <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 gap-4 gap-y-5">
                <div>
                    <div className="flex justify-around mb-3">
                        <SwitchInput SwitchName="generateRecoveryReport" onSwitchCheck={() => { setEdited(true); onEdited(ReportOptions.name) }}>
                            Recovery
                        </SwitchInput>
                    </div>
                    <TextInput
                        TextName="recoveryReportFilename"
                        TextPlaceholder="arquivo.txt"
                        value="recovery_report/recovery_report.txt" onTextInput={() => { setEdited(true); onEdited(ReportOptions.name) }}
                    >
                        Recovery filename
                    </TextInput>
                </div>

                <div>
                    <div className="flex justify-around mb-3">
                        <SwitchInput SwitchName="generateExecutedCommandsCsv" onSwitchCheck={() => { setEdited(true); onEdited(ReportOptions.name) }}>
                            Executed commands
                        </SwitchInput>
                    </div>
                    <TextInput
                        TextName="executedCommandsCsvFilename"
                        TextPlaceholder="arquivo.csv"
                        value="datasets/datasets.csv" onTextInput={() => { setEdited(true); onEdited(ReportOptions.name) }}
                    >
                        Executed commands filename
                    </TextInput>
                </div>

                <div>
                    <div>
                        <div className="flex justify-around mb-3">
                            <SwitchInput SwitchName="generateIndexingReportCsv" onSwitchCheck={() => { setEdited(true); onEdited(ReportOptions.name) }}>
                                Indexing
                            </SwitchInput>
                        </div>
                        <TextInput
                            TextName="indexingReportCsvFilename"
                            TextPlaceholder="arquivo.csv"
                            value="indexing_report/indexing.csv" onTextInput={() => { setEdited(true); onEdited(ReportOptions.name) }}
                        >
                            Indexing filename
                        </TextInput>
                    </div>
                </div>

                <div className="flex justify-around mb-3">
                    <SwitchInput SwitchName="overwriteReportFiles" onSwitchCheck={() => { setEdited(true); onEdited(ReportOptions.name) }}>
                        Overwrite
                    </SwitchInput>
                </div>
            </div>
        </OptionsBoard>
    )
}

export default ReportOptions;