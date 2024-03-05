import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";

const IndexerOptions = () => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Indexer">
            <div className="flex justify-around">
                <SwitchInput SwitchName="instantRecoveryState" onSwitchCheck={() => setEdited(true)} defaultChecked>
                    Instant Recovery
                </SwitchInput>
                <SwitchInput SwitchName="instantRecoverySynchronous" onSwitchCheck={() => setEdited(true)}>
                    Synchronous
                </SwitchInput>
            </div>
            <TextInput
                TextName="aofFilename"
                TextPlaceholder="arquivo.aof"
                value="logs/sequentialLog.aof"
                onTextInput={() => setEdited(true)}
                >
                AOF filename
            </TextInput>
            <TextInput
                TextName="indexedlogFilename"
                TextPlaceholder="arquivo.txt"
                value="logs/indexedLog.db"
                onTextInput={() => setEdited(true)}
            >
                indexed log filename
            </TextInput>
            <RangeInput RangeName="indexerTimeInterval" RangeDefault={500} onRangeInput={() => setEdited(true)}>
                Time interval
            </RangeInput>
        </OptionsBoard>
    )
}

export default IndexerOptions;