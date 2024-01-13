import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";


const CpuChart = () => {
    const [data, setData] = useState<[number, number][]>([]);
    // variável para armazenar o timestamp da última atualização
    const timestamps: number[] = [];
    // variável para armazenar a porcentagem de uso da CPU
    const cpuUsage: number[] = [];

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8081/cpu");

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
            console.log("Connection closed");
        };
    }, []);

    if (data.length === 0) {
        return <div className="loading">Loading...</div>;
    }

    const chartData = [["Timestamp", "CPU Usage"], ...data];


    const chartOptions = {
        chart: {
            title: "CPU Usage",
            subtitle: "in %",
        },
        hAxis: {
            title: "Time",
        },
        vAxis: {
            title: "CPU Usage",
            viewWindow: {
                min: 0,
                max: 100,
            },
        },
    };

    return (
        <div className="mx-auto w-full text-center py-3 bg-white rounded ">
                <h2 className="text-xl font-semibold">Uso de CPU</h2>
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

export default CpuChart;
