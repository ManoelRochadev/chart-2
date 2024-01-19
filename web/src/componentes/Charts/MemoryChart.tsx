import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const MemoryChart = () => {
  const [data, setData] = useState<[number, number][]>([]);
  // variável para armazenar o timestamp da última atualização
  const timestamps: number[] = [];
  // variável para armazenar a porcentagem de uso da CPU
  const memoryUsage: number[] = [];
  // estado para armazenar o maior valor de memória usado
  const [maxMemoryUsage, setMaxMemoryUsage] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081/memory");

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        timestamps.push(message[0]);
        // transforma o valor de bytes para megabytes
        memoryUsage.push(message[1] / 1024);
        if (
          timestamps.length > 1 &&
          timestamps[timestamps.length - 1] ===
          timestamps[timestamps.length - 2]
        ) {
          const media =
            (memoryUsage[memoryUsage.length - 1] +
              memoryUsage[memoryUsage.length - 2]) /
            2;

          setData((dadosAnteriores) => {
            const novosDados = [...dadosAnteriores];
            novosDados[novosDados.length - 1] = [message[0], media];

            // verifica se o novo valor é maior que o maior valor de memória usado
            if (media > maxMemoryUsage) {
              setMaxMemoryUsage(media);
            }
            return novosDados;
          });
        } else {
          // Se os timestamps forem diferentes, adiciona simplesmente o novo ponto de dados

          setData((dadosAnteriores) => {
            // verifica se o novo valor é maior que o maior valor de memória usado
            if (message[1] > maxMemoryUsage) {
              setMaxMemoryUsage(message[1]);
            }
            return [
              ...dadosAnteriores,
              [message[0], message[1] / 1024],
            ];
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("Connection closed");
    };

    return () => {
      ws.close()
    }

  }, []);

  if (data.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  const chartData = [["Timestamp ", "Memory Usage"], ...data];

  const chartOptions = {
    chart: {
      title: "Memory Usage",
      subtitle: "in %",
    },
    hAxis: {
      title: "Time",
    },
    vAxis: {
      title: "Memory Usage",
      viewWindow: {
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="mx-auto w-full text-center py-3 bg-white rounded ">
      <h2>Uso de Memória</h2>
      <Chart
        chartType="LineChart"
        options={chartOptions}
        data={chartData}
        width="100%"
        legendToggle
      />
    </div>
  );
};

export default MemoryChart;
