import { useState } from "react";
import NavBar from "./componentes/NavBar";
import FormController from "./componentes/FormController";
import ChartBoard from "./componentes/ChartBoard";


const App = () => {

  const [generateArquive, setGenerateArquive] = useState<boolean>(false);
  const [loadingServer, setLoadingServer] = useState<boolean>(false);
  const [generateArquiveMonitoring, setGenerateArquiveMonitoring] = useState<boolean>(false);

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

  const stopChart = () => {
    return 0;
}

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
        !generateArquive &&
        <FormController initServer={initializeServer} />
      }
      {
        generateArquive &&
          <ChartBoard stopChart={stopChart} />
      }
    </div >
  );
};

export default App;
