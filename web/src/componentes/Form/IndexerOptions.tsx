import { useState } from "react";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, RangeInput } from "./InputTypes";
import OptionHint from "./OptionHint";

const IndexerOptions = ({ onEdited }: any) => {
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <OptionsBoard BoardHeader="Indexer" hintIcon={<OptionHint>hey!</OptionHint>}>

            <div className="col-span-full flex justify-around">
                <SwitchInput SwitchName="instantRecoveryState" onSwitchCheck={() => { setEdited(true); onEdited(IndexerOptions.name) }} defaultChecked>
                    Instant Recovery
                </SwitchInput>
                <SwitchInput SwitchName="instantRecoverySynchronous" onSwitchCheck={() => { setEdited(true); onEdited(IndexerOptions.name) }}>
                    Synchronous
                </SwitchInput>
            </div>
            <TextInput
                TextName="aofFilename"
                TextPlaceholder="arquivo.aof"
                value="logs/sequentialLog.aof"
                onTextInput={() => { setEdited(true); onEdited(IndexerOptions.name) }}
            >
                AOF filename
            </TextInput>
            <TextInput
                TextName="indexedlogFilename"
                TextPlaceholder="arquivo.txt"
                value="logs/indexedLog.db"
                onTextInput={() => { setEdited(true); onEdited(IndexerOptions.name) }}
            >
                indexed log filename
            </TextInput>
            <RangeInput RangeName="indexerTimeInterval" RangeDefault={500} onRangeInput={() => { setEdited(true); onEdited(IndexerOptions.name) }}>
                Time interval
            </RangeInput>
        </OptionsBoard>
    )
}

export default IndexerOptions;