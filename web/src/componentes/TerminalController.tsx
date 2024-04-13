import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

interface TerminalData {
    value: string[];
}

const TerminalController = ({ value }: TerminalData) => {
    return (
        <Terminal
            name="MM-DIRECT"
            height="120px"
            colorMode={ColorMode.Dark}
        >
            {value.length > 0 &&
                value.map((log, index) => {
                    return (
                        <TerminalOutput key={index}>{log}</TerminalOutput>
                    );
                })}
        </Terminal>
    );
};

export default TerminalController;
