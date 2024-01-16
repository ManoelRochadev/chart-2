import { useState } from "react";
import NavBar from "./componentes/NavBar";
import FormController from "./componentes/FormController";
import CpuChart from "./componentes/CpuChart";
import ReloadButton from "./componentes/ReloadButton";
import { TerminalController } from "./componentes/Terminal";
import MemoryChart from "./componentes/MemoryChart";
type NavBarProps = {
    onButtonClick: (buttonName: string) => void;
};

const App = () => {
    const [generateArquive, setGenerateArquive] = useState<boolean>(false);
    const [loadingServer, setLoadingServer] = useState<boolean>(false);
    const [generateArquiveMonitoring, setGenerateArquiveMonitoring] =
        useState<boolean>(false);
    const [showTerminal, setShowTerminal] = useState<boolean>(false);
    const [showInsights, setShowInsights] = useState<boolean>(true);
    const [logs, setLogs] = useState<string[]>([]);
    const [buttonSelected, setButtonSelected] = useState<string>("Insights");

    const handleButtonClick = (buttonName: string) => {
        // Atualiza o estado buttonSelected com o nome do botão clicado
        setButtonSelected(buttonName);
    };

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

        const ws = new WebSocket(`ws://localhost:8081/${url}`);

        ws.onmessage = (event) => {
            setLogs((prevLogs) => [...prevLogs, event.data]);
            if (
                event.data === "Generating information database commands" &&
                !generateArquive
            ) {
                console.log("Server started");
                setLoadingServer(false);
                setGenerateArquive(true);
            }

      if (event.data === "Generating system monitoring") {
        console.log("Server started");
        setLoadingServer(false);
        setGenerateArquiveMonitoring(true);

        return
      }
    };
  };

    const NavButtons: React.FC<NavBarProps> = ({ onButtonClick }) => {
        return (
            <div className="nav-buttons">
                <button
                    className={`button ${buttonSelected === "Insights" ? "selected" : ""
                        }`}
                    onClick={() => {
                        onButtonClick("Insights");
                        setShowInsights(true);
                        setShowTerminal(false);
                    }}
                >
                    Insights
                </button>
                <button
                    className={`button ${buttonSelected === "Runtime Logs" ? "selected" : ""
                        }`}
                    onClick={() => {
                        onButtonClick("Runtime Logs");
                        setShowTerminal(true);
                        setShowInsights(false);
                    }}
                >
                    Runtime Logs
                </button>
            </div>
        );
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
              </div>
            </div>
          </div>
        </div>
      }

      {
        generateArquive && <NavButtons onButtonClick={handleButtonClick} />
      }

      {
        generateArquive && (
          <div
            className={`chart-container ${showInsights ? '' : 'item-hidden'}`}
          >
            <TransferChart />
            {
              generateArquiveMonitoring ? <>
                <CpuChart />
                <MemoryChart />
              </> : (
                <>
                </>
              )
            }

          </div>
        )

      }

            {generateArquive && (
                <div
                    className={`terminal-container ${showTerminal ? "" : "item-hidden"
                        }`}
                ></div>
            )}

            {(generateArquive || generateArquiveMonitoring) && <ReloadButton onButtonClick={reload} />}

            <TerminalController value={logs} />
        </div>
    );
};

export default App;
