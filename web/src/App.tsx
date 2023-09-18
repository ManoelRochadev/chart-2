import CpuChart from "./componentes/CpuChart";
import TransferChart from "./componentes/TransferChart";
import FormControlerPanel from "./componentes/FormController";

const App = () => {

  return (
    <div className="chart-panel">
      <FormControlerPanel />

      <CpuChart />

      <TransferChart />
    </div>
  );
};

export default App;
