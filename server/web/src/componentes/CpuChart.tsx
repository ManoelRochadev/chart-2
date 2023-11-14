import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

interface CpuData {
  timestamp: number;
  usage: number;
}

const CpuChart = () => {
  const [data, setData] = useState<CpuData[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/cpu');

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setData((prevData) => [...prevData, message]);
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

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const chartData = [['Timestamp', 'CPU Usage'], ...data];

  const chartOptions = {
    chart: {
      title: 'CPU Usage',
      subtitle: 'in %',
    },
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'CPU Usage',
      viewWindow: {
        min: 0,
        max: 100,
      }
    }
  };

  return (
    <div className="container chart-container chart-container-cpu">
      <div className="row justify-content-center text-center">
        <div className="col-10">
          <h2>Uso de CPU</h2>
          <Chart chartType="LineChart" options={chartOptions} data={chartData} legendToggle />
        </div>
      </div>
    </div>
  );
};

export default CpuChart;
