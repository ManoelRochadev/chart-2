import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

interface TransitionData {
  timestamp: number;
  transitions: number;
}

const TransferChart = () => {
  const [info, setInfo] = useState<TransitionData[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/data');

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setInfo((prevInfo) => [...prevInfo, message]);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('Connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  if (info.length === 0) {
    return <div>Loading...</div>;
  }

  const chartData = [['Timestamp', 'Transitions'], ...info];

  const chartOptions = {
    chart: {
      title: 'Transitions',
      subtitle: 'in %',
    },
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Transitions',
      viewWindow: {
        min: 0,
        max: 20000,
      }
    }
  };

  return (
    <div className="container chart-container chart-container-transfer">
      <div className="row justify-content-center text-center">
        <div className="col-10">
          <h2>gráfico Transferências</h2>
          <Chart chartType="LineChart" options={chartOptions} data={chartData} legendToggle />
        </div>
      </div>
    </div>
  );
};

export default TransferChart;
