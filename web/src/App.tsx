import { useState } from "react";
import NavBar from "./componentes/NavBar";
//import CpuChart from "./componentes/CpuChart";
import TransferChart from "./componentes/TransferChart";
import FormController from "./componentes/FormController";



const App = () => {

  const [generateArquive, setGenerateArquive] = useState<boolean>(false);
  const [loadingServer, setLoadingServer] = useState<boolean>(false);

  const initializeServer = () => {
    console.log("Iniciando servidor");
    setLoadingServer(true);
    const ws = new WebSocket('ws://localhost:8080/start');

    ws.onmessage = (event) => {
      console.log(event.data);
      if (event.data === "Generating information database commands") {
        console.log("Server started");
        setLoadingServer(false);
        setGenerateArquive(true);
      }
    };
  };

  if (loadingServer) {
    return (
      <div className="div">
        <NavBar />
        <div className="container">
          <div className="button-container">
            <button disabled>Iniciar servidor</button>
          </div>
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        </div>
      </div>)
  }

  return (
    <div>
      <NavBar />
      {
        !generateArquive && <div className="button-container">
          <div className="container">
            <div className="card">
              <h3 className="card-header text-light">Redis-IR</h3>
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
    </div >

  );
};

export default App;
