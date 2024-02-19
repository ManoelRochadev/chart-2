import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Loading from "./Loading"
import { chartModeList } from "./ChartFunctions"


interface cpuChartProps {
    chartMode: string,
    onChartClick: (data: any) => void,
    selectedChart?: boolean
}


const CpuChart = ({ chartMode = "default", onChartClick, selectedChart = false }: cpuChartProps) => {
    const [data, setData] = useState<[number, number][]>([]);
    const [selected, setSelected] = useState<boolean>(selectedChart);

    // variável para armazenar o timestamp da última atualização
    const timestamps: number[] = [];

    // variável para armazenar a porcentagem de uso da CPU
    const cpuUsage: number[] = [];


    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8081/cpu");
        ws.onopen = () => {
            console.log(`conexão aberta em ${CpuChart.name}`);
            onChartLoad((prevInfo: WebSocket[]) => [...prevInfo, ws]);
        }
        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                timestamps.push(message[0]);
                cpuUsage.push(message[1]);

                if (timestamps.length > 1 && timestamps[timestamps.length - 1] === timestamps[timestamps.length - 2]) {

                    const media = (cpuUsage[cpuUsage.length - 1] + cpuUsage[cpuUsage.length - 2]) / 2;

                    setData((dadosAnteriores) => {
                        const novosDados = [...dadosAnteriores];
                        novosDados[novosDados.length - 1] = [message[0], media];
                        return novosDados;
                    });

                } else {

                    // Se os timestamps forem diferentes, adiciona simplesmente o novo ponto de dados
                    setData((dadosAnteriores) => [...dadosAnteriores, message]);

                }



            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        ws.onclose = () => {
            console.log("CPU Connection closed");
        };


    }, []);

    if (data.length === 0) {
        return (
            <Loading />
        );
    }


    const chartData = [["Timestamp", "CPU Usage"], ...data];

    const chartOptions: any = chartModeList(chartMode);

    chartOptions.title = "CPU Usage"

    if (selected) {
        onChartClick(chartData)
    }

    return (

        <div id="cpu_chart" className="mx-auto text-center pt-3 pb-1 bg-white rounded-lg  border-2 border-blue-700  ">
            <Chart
                chartType="LineChart"
                options={chartOptions}
                data={chartData}
                legendToggle
            />
        </div>
    );
};

export default CpuChart;

