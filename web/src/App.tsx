import CpuChart from "./componentes/CpuChart";
import TransferChart from "./componentes/TransferChart";


const App = () => {

  return (
    <div className="container">
      <div className="container trensfer-graph">
        <CpuChart />
      </div>
      <div className="container cpu-graph">
        <TransferChart />
      </div>
    </div>

  );
};

export default App;
