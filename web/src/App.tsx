import { useState } from "react";
import NavBar from "./componentes/NavBar";
import SetupPanel from "./componentes/Form/SetupPanel";
import ChartBoard from "./componentes/Charts/ChartBoard";


const App = () => {
    const [loadingServer, setLoadingServer] = useState<boolean>(false);
    const [generateArquive, setGenerateArquive] = useState<boolean>(false);
    const [generateArquiveMonitoring, setGenerateArquiveMonitoring] =
        useState<boolean>(false);
    const [startConnection, setStartConnection] = useState<WebSocket>();
    const [logs, setLogs] = useState<string[]>([]);

    const initializeServer = () => {
        console.log("Iniciando servidor");

        setLoadingServer(!loadingServer);

        const url = "start";

        // const url: string =
        //     params.includes("graph-cpu") && params.includes("graph-transf")
        //         ? "teste_start"
        //         : params.includes("graph-cpu")
        //             ? "teste_cpu"
        //             : "teste_data";

        const ws = new WebSocket(`ws://localhost:8081/${url}`);

        ws.onmessage = (event) => {
            setLogs((prevLogs) => [...prevLogs, event.data]);
            if (event.data === "Generating information database commands") {
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

        setStartConnection(ws);
    };

    const onReloadButtuonClick = (e: Event, connectionsArray: WebSocket[]) => {
        console.log(connectionsArray);

        connectionsArray.forEach((conection: WebSocket) => conection.close())
        startConnection?.close()
        setLogs([]);
        setGenerateArquive(false);
        setGenerateArquiveMonitoring(false);
    };


    return (
        <div>
            <NavBar />

            <main>

                {!generateArquive && !generateArquiveMonitoring && (
                    <SetupPanel initServer={initializeServer} />
                )}

                {loadingServer && (
                    <div className="flex flex-row fixed top-0 w-full h-full pointer-events-none">
                        <div className="h-fit sm:w-[90vw] md:w-full max-w-xl sm:max-w-lg md:max-w-2xl lg:max-w-lg py-10 px-7 mx-auto my-auto space-y-5 bg-slate-300 rounded-lg shadow-md text-center">
                            <p className="animate-pulse text-slate-800 text-3xl font-mono">
                                loading...
                            </p>
                        </div>
                    </div>

                )}

                {generateArquive && (
                    <ChartBoard
                        cpuChart={generateArquiveMonitoring}
                        transferChart={generateArquive}
                        terminalLog={logs}
                        onReloadButtonClick={onReloadButtuonClick}
                    />
                )}
            </main>

        </div>
    );
}
    ;

export default App;


