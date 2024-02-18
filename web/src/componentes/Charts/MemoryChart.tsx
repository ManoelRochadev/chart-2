import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Loading from "./Loading"
import { chartModeList } from "./ChartFunctions"


interface cpuChartProps {
  chartMode: string,
  onChartClick: (data: any) => void
}


const MemoryChart = ({ chartMode = "default", onChartClick }: cpuChartProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [data, setData] = useState<[number, number][]>([]);

  // estado para armazenar o maior valor de memória usado
  const [maxMemoryUsage, setMaxMemoryUsage] = useState(0);

  useEffect(() => {
    // variável para armazenar o timestamp da última atualização
    const timestamps: number[] = [];
    // variável para armazenar a porcentagem de uso da CPU
    const memoryUsage: number[] = [];
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



  }, []);

  if (data.length === 0) {
    return (
      <Loading />
    );
  }



  const chartData = [["Timestamp ", "Memory Usage"], ...data];

  const chartOptions: any = chartModeList(chartMode);

  chartOptions.title = "Memory Usage"

  return (
    <div onClick={() => onChartClick(data)}  className="mx-auto text-center pt-3 pb-1 bg-white rounded-lg  border-2 border-blue-700">
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
