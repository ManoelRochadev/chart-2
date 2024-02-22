export const chartModeList: any = (mode = "default") => {
    const modes: any = {
        default: {
            hAxis: {
            },
            vAxis: {
                viewWindow: {
                    min: 0,
                    max: 100,
                },
            },
            legend: { position: 'bottom', textStyle: { color: 'blue', fontSize: 14 } }
        },

        minimalist: {
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
            legend: "none",
            enableInteractivity: false,
        }
    }

    return modes[mode]
}