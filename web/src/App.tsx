import { useState } from "react";
import NavBar from "./componentes/NavBar";
//import CpuChart from "./componentes/CpuChart";
import TransferChart from "./componentes/TransferChart";
import FormController from "./componentes/FormController";
import CpuChart from "./componentes/CpuChart";
import { TerminalController } from "./componentes/Terminal";
type NavBarProps = {
  onButtonClick: (buttonName: string) => void;
};


const App = () => {

  const [generateArquive, setGenerateArquive] = useState<boolean>(false);
  const [loadingServer, setLoadingServer] = useState<boolean>(false);
  const [generateArquiveMonitoring, setGenerateArquiveMonitoring] = useState<boolean>(false);
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [showInsights, setShowInsights] = useState<boolean>(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [buttonSelected, setButtonSelected] = useState<string>("Insights");

  const handleButtonClick = (buttonName: string) => {
    // Atualiza o estado buttonSelected com o nome do botão clicado
    setButtonSelected(buttonName);
  };

  const initializeServer = () => {
    console.log("Iniciando servidor");
    setLoadingServer(true);
    const ws = new WebSocket('ws://localhost:8081/start');

    ws.onmessage = (event) => {
      console.log(event.data);
      setLogs((prevLogs) => [...prevLogs, event.data]);
      if (event.data === "Generating information database commands") {
        console.log("Server started");
        setLoadingServer(false);
        setGenerateArquive(true);
      }

      if (event.data === "Generating system monitoring") {
        console.log("Server started");
        setLoadingServer(false);
        const interval = setInterval(() => {
          setGenerateArquiveMonitoring(true);
        }, 1000);

        return () => clearInterval(interval);
      }
    };
  };

  const NavButtons: React.FC<NavBarProps> = ({ onButtonClick }) => {
    return (
      <div className="nav-buttons">
        <button className={`button ${buttonSelected === 'Insights' ? 'selected' : ''}`}
          onClick={() => {
            onButtonClick('Insights');
            setShowInsights(true);
            setShowTerminal(false);
          }}
          >
          Insights
        </button>
        <button
          className={`button ${buttonSelected === 'Runtime Logs' ? 'selected' : ''}`}
          onClick={() => {
            onButtonClick('Runtime Logs');
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
        <div className="loading">
          Iniciando servidor...
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      {
        !generateArquive && <div className="button-container">
          <div className="container">
            <div className="card">
              <h3 className="card-header text-light">MM-DIRECT</h3>
              <div className="card-body">
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
              generateArquiveMonitoring && <CpuChart />
            }
          </div>
        )
        
      }

      {
        generateArquive && <div
          className={`terminal-container ${showTerminal ? '' : 'item-hidden'}`}
        >
          <TerminalController value={logs} />
        </div>
      }
    </div >

  );
};

export default App;
