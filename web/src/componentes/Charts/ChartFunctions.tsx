import { GoogleChartOptions } from "react-google-charts"

export const chartModeList = (mode = "default", title: string, xAxisTitle = undefined, yAxisTitle = undefined) => {
    const modes: Record<string, GoogleChartOptions> = {
        default: {
            title,
            backgroundColor: "white",
            legend: { position: 'bottom', textStyle: { color: 'blue', fontSize: 14 } },
            hAxis: {
                title: xAxisTitle
            },
            vAxis: {
                title: yAxisTitle
            },
        },

        minimalist: {
            title,
            backgroundColor: "white",
            titleTextStyle: {
                fontSize: 14
            },
            chartArea: {
                width: "80%",
                top: "22%",
                height: "60%"
            },
            hAxis: {
                textPosition: 'none',
            },
            vAxis: {
                textPosition: 'none',
            },
            width: 160,
            height: 100,
            legend: "none",
            enableInteractivity: false,
        }
    }

    return modes[mode]
}