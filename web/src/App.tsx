import { useState } from "react";
import NavBar from "./componentes/NavBar";
//import CpuChart from "./componentes/CpuChart";
import TransferChart from "./componentes/TransferChart";
import FormController from "./componentes/FormController";
import CpuChart from "./componentes/CpuChart";



const App = () => {

  const [generateArquive, setGenerateArquive] = useState<boolean>(false);
  const [loadingServer, setLoadingServer] = useState<boolean>(false);
  const [generateArquiveMonitoring, setGenerateArquiveMonitoring] = useState<boolean>(false);

  const initializeServer = () => {
    console.log("Iniciando servidor");
    setLoadingServer(true);
    const ws = new WebSocket('ws://localhost:8081/start');

    ws.onmessage = (event) => {
      console.log(event.data);
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
        generateArquive && <div>
          <TransferChart />
        </div>
      }
      {
        generateArquiveMonitoring && <div>
          <CpuChart />
        </div>
      }
    </div >

  );
};

export default App;
