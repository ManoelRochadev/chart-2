import { useState } from "react";
//import CpuChart from "./componentes/CpuChart";
import TransferChart from "./componentes/TransferChart";


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
    return <div className="container">
      <div className="button-container">
        <button disabled>Iniciar servidor</button>
      </div>
      <div className="loading-container">
        <div className="loading"></div>
      </div>
    </div>
  }

  return (
    <div className="container">
      {
        !generateArquive && <div className="button-container">
          <button onClick={initializeServer}>Iniciar servidor</button>
        </div>
      }
      {generateArquive && <div>
        <TransferChart />
      </div>}
    </div>

  );
};

export default App;
