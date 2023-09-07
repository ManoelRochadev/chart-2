import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

interface TransitionData {
    timestamp: number;
    transitions: number;
}
const Teste = () => {
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
          max: 1000,
        }
      }
    };
  
    return (
      <div className="chart-container">
        <Chart chartType="LineChart" options={chartOptions}  data={chartData} legendToggle />
      </div>
    );
  };
  
export default Teste;
  