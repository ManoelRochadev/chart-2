
const StopButton = () => {

    // Função para para a renderização dos gráficos e retornar ao painel de controle 
    const stopChart = () => {
        return 0;
    }

    return (
        <div className="stop-button">
            <button onClick={stopChart} type="button" className="btn btn-warning">STOP</button>
        </div>
    );
}

export default StopButton;