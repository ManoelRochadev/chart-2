import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput } from "./InputTypes";

const ReportOptions = () => {
    return (
        <OptionsBoard BoardHeader="Report">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-y-5">
                <div>
                    <div className="flex justify-around mb-3">
                        <SwitchInput SwitchName="generateRecoveryReport">
                            Recovery
                        </SwitchInput>
                    </div>
                    <TextInput
                        TextName="recoveryReportFilename"
                        TextPlaceholder="arquivo.txt"
                        value="recovery_report/recovery_report.txt"
                    >
                        Recovery filename
                    </TextInput>
                </div>

                <div>
                    <div className="flex justify-around mb-3">
                        <SwitchInput SwitchName="generateExecutedCommandsCsv">
                            Executed commands
                        </SwitchInput>
                    </div>
                    <TextInput
                        TextName="executedCommandsCsvFilename"
                        TextPlaceholder="arquivo.csv"
                        value="datasets/datasets.csv"
                    >
                        Executed commands filename
                    </TextInput>
                </div>

                <div>
                    <div>
                        <div className="flex justify-around mb-3">
                            <SwitchInput SwitchName="generateIndexingReportCsv">
                                Indexing
                            </SwitchInput>
                        </div>
                        <TextInput
                            TextName="indexingReportCsvFilename"
                            TextPlaceholder="arquivo.csv"
                            value="indexing_report/indexing.csv"
                        >
                            Indexing filename
                        </TextInput>
                    </div>
                </div>

                <div className="flex justify-around mb-3">
                    <SwitchInput SwitchName="overwriteReportFiles">
                        Overwrite
                    </SwitchInput>
                </div>
            </div>
        </OptionsBoard>
    )
}

export default ReportOptions;