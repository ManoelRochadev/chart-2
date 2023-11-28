import { useState } from "react";
import NavBar from "./componentes/NavBar";
//import CpuChart from "./componentes/CpuChart";
import TransferChart from "./componentes/TransferChart";
import FormController from "./componentes/FormController";
import CpuChart from "./componentes/CpuChart";

const App = () => {
    const [generateArquive, setGenerateArquive] = useState<boolean>(false);
    const [loadingServer, setLoadingServer] = useState<boolean>(false);
    const [generateArquiveMonitoring, setGenerateArquiveMonitoring] =
        useState<boolean>(false);

    const delay = (time: number) => {
        return new Promise<void>((resolve) => setTimeout(resolve, time));
    };

    const initializeServer = (params: Array<string>) => {
        console.log("Iniciando servidor");

        setLoadingServer(true);

        const url: string =
            params.includes("graph-cpu") && params.includes("graph-transf")
                ? "teste_start"
                : params.includes("graph-cpu")
                ? "teste_cpu"
                : "teste_data";

        const ws = new WebSocket(`ws://localhost:8080/${url}`);

        ws.onmessage = (event) => {
            if ((event.data === "Generating information database commands") && !generateArquive) {
                    console.log("Server started");
                    setLoadingServer(false);
                    setGenerateArquive(true);
            }

            if ((event.data === "Generating system monitoring") && !generateArquiveMonitoring) {
                    console.log("Server started");
                    setLoadingServer(false);
                    setGenerateArquiveMonitoring(true);
            }
        };
    };

    const reload = () => {
        setLoadingServer(true);

        delay(1000).then(() => {
            setLoadingServer(false);
            setGenerateArquive(false);
            setGenerateArquiveMonitoring(false);
        });
    };

    if (loadingServer) {
        return (
            <div className="div">
                <NavBar />
                <div className="loading">Carregando...</div>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            {!generateArquive && !generateArquiveMonitoring && (
                <FormController initServer={initializeServer} />
            )}

            {generateArquive && (
                <div>
                    <TransferChart />
                </div>
            )}
            {generateArquiveMonitoring && (
                <div>
                    <CpuChart />
                </div>
            )}

            {(generateArquive || generateArquiveMonitoring) && (
                <div className="container reload-button">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <button
                                className="btn btn-primary"
                                onClick={reload}
                            >
                                Return
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
