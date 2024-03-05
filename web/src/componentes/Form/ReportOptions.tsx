import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput } from "./InputTypes";

const ReportOptions = () => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Report">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-y-5">
                <div>
                    <div className="flex justify-around mb-3">
                        <SwitchInput SwitchName="generateRecoveryReport" onSwitchCheck={() => setEdited(true)}>
                            Recovery
                        </SwitchInput>
                    </div>
                    <TextInput
                        TextName="recoveryReportFilename"
                        TextPlaceholder="arquivo.txt"
                        value="recovery_report/recovery_report.txt" onTextInput={() => setEdited(true)}
                    >
                        Recovery filename
                    </TextInput>
                </div>

                <div>
                    <div className="flex justify-around mb-3">
                        <SwitchInput SwitchName="generateExecutedCommandsCsv" onSwitchCheck={() => setEdited(true)}>
                            Executed commands
                        </SwitchInput>
                    </div>
                    <TextInput
                        TextName="executedCommandsCsvFilename"
                        TextPlaceholder="arquivo.csv"
                        value="datasets/datasets.csv" onTextInput={() => setEdited(true)}
                    >
                        Executed commands filename
                    </TextInput>
                </div>

                <div>
                    <div>
                        <div className="flex justify-around mb-3">
                            <SwitchInput SwitchName="generateIndexingReportCsv" onSwitchCheck={() => setEdited(true)}>
                                Indexing
                            </SwitchInput>
                        </div>
                        <TextInput
                            TextName="indexingReportCsvFilename"
                            TextPlaceholder="arquivo.csv"
                            value="indexing_report/indexing.csv" onTextInput={() => setEdited(true)}
                        >
                            Indexing filename
                        </TextInput>
                    </div>
                </div>

                <div className="flex justify-around mb-3">
                    <SwitchInput SwitchName="overwriteReportFiles" onSwitchCheck={() => setEdited(true)}>
                        Overwrite
                    </SwitchInput>
                </div>
            </div>
        </OptionsBoard>
    )
}

export default ReportOptions;