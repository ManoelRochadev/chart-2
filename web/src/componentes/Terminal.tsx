import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

interface TerminalData {
  value: string[];
}

export const TerminalController = ({ value }: TerminalData) => {

  return (
    <div className="terminal">
      <Terminal
        name='MM-DIRECT'
        height='320px'
        colorMode={ColorMode.Dark}
      >
        {
          value.length > 0 && value.map((log, index) => {
            return <TerminalOutput key={index}>{log}</TerminalOutput>
          }
          )
        }
      </Terminal>
    </div>
  )
};