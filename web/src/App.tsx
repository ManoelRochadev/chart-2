import { useState } from "react";
import NavBar from "./componentes/NavBar";
import SetupPanel from "./componentes/Form/SetupPanel";
import ChartBoard from "./componentes/Charts/ChartBoard";
// import CpuChart from "./componentes/CpuChart";
// import { TerminalController } from "./componentes/Terminal";

// type NavBarProps = {
//     onButtonClick: (buttonName: string) => void;
// };

const App = () => {
    const [loadingServer, setLoadingServer] = useState<boolean>(false);
    const [experiment, setExperiment] = useState<boolean>(false);
    const [generateArquive, setGenerateArquive] = useState<boolean>(false);
    const [generateArquiveMonitoring, setGenerateArquiveMonitoring] =
        useState<boolean>(false);

    const [logs, setLogs] = useState<string[]>([]);
    // const [buttonSelected, setButtonSelected] = useState<string>("Insights");

    // const handleButtonClick = (buttonName: string) => {
    //     // Atualiza o estado buttonSelected com o nome do botão clicado
    //     setButtonSelected(buttonName);
    // };

    // const delay = (time: number) => {
    //     return new Promise<void>((resolve) => setTimeout(resolve, time));
    // };

    const initializeServer = () => {
        console.log("Iniciando servidor");

        setLoadingServer(true);

        const url = "teste_start";

        // const url: string =
        //     params.includes("graph-cpu") && params.includes("graph-transf")
        //         ? "teste_start"
        //         : params.includes("graph-cpu")
        //             ? "teste_cpu"
        //             : "teste_data";

        const ws = new WebSocket(`ws://localhost:8081/${url}`);

        ws.onmessage = (event) => {
            console.log(event.data);
            setExperiment(true);
            setLogs((prevLogs) => [...prevLogs, event.data]);
            if (
                event.data === "Generating information database commands" &&
                !generateArquive
            ) {
                console.log("Server started");
                setLoadingServer(false);
                setGenerateArquive(true);
            }

            if (
                event.data === "Generating system monitoring" &&
                !generateArquiveMonitoring
            ) {
                console.log("Server started");
                setLoadingServer(false);
                setGenerateArquiveMonitoring(true);
            }
        };
    };

    const onReloadButtuonClick = () => {
        setExperiment(false)
        setLogs([]);
        setGenerateArquive(false);
        setGenerateArquiveMonitoring(false);
    };

    // const NavButtons: React.FC<NavBarProps> = ({ onButtonClick }) => {
    //     return (
    //         <div className="nav-buttons">
    //             <button
    //                 className={`button ${
    //                     buttonSelected === "Insights" ? "selected" : ""
    //                 }`}
    //                 onClick={() => {
    //                     onButtonClick("Insights");
    //                     // setShowInsights(true);
    //                     // setShowTerminal(false);
    //                 }}
    //             >
    //                 Insights
    //             </button>
    //             <button
    //                 className={`button ${
    //                     buttonSelected === "Runtime Logs" ? "selected" : ""
    //                 }`}
    //                 onClick={() => {
    //                     onButtonClick("Runtime Logs");
    //                     // setShowTerminal(true);
    //                     // setShowInsights(false);
    //                 }}
    //             >
    //                 Runtime Logs
    //             </button>
    //         </div>
    //     );
    // };

    return (
        <div>
            <NavBar />

            {!generateArquive && !generateArquiveMonitoring && (
                <SetupPanel initServer={initializeServer} />
            )}

            {loadingServer && <div className="loading"></div>}

            {experiment && (
                <ChartBoard
                    cpuChart={generateArquiveMonitoring}
                    transferChart={generateArquive}
                    terminalLog={logs}
                    onReloadButtonClick={onReloadButtuonClick}
                />
            )}

            {/* <TerminalController value={logs} /> */}
        </div>
    );
};

export default App;

{
    /* {generateArquive && (
        <NavButtons onButtonClick={handleButtonClick} />
    )}

    {generateArquive && (
        <div
            className={`chart-container ${showInsights ? "" : "item-hidden"
                }`}
        >
            <TransferChart />
            {generateArquiveMonitoring && <CpuChart />}
        </div>
    )}

    {generateArquive && (
        <div
            className={`terminal-container ${showTerminal ? "" : "item-hidden"
                }`}
        ></div>
    )}

    {(generateArquive || generateArquiveMonitoring) && <ReloadButton onButtonClick={reload} />} */
}
