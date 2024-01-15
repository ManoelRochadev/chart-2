import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

interface TerminalData {
    value: string[];
}

const TerminalController = ({ value }: TerminalData) => {
    return (
        <div className=" justify-self-center col-span-2 w-4/5">
            <Terminal
                name="MM-DIRECT"
                height="280px"
                colorMode={ColorMode.Dark}
            >
                {value.length > 0 &&
                    value.map((log, index) => {
                        return (
                            <TerminalOutput key={index}>{log}</TerminalOutput>
                        );
                    })}
            </Terminal>
        </div>
    );
};

export default TerminalController;
