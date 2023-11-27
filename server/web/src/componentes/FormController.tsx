interface FormProp {
    initServer: (params: Array<string>) => void;
}

const FormController = ({ initServer }: FormProp) => {
    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(...Object.keys(formJson));
        initServer(Object.keys(formJson));
    }

    return (
        <div>
            <div className="container">
                <div className="card">
                    <h3 className="card-header text-light">MM-DIRECT</h3>
                    <div className="card-body">
                        <form method="post" onSubmit={handleSubmit}>
                            <div>
                                <p className="display-6">GRAFICOS: </p>
                                <div className="mb-3">
                                    <label className="me-3">
                                        <input
                                            type="checkbox"
                                            name="graph-cpu"
                                        />
                                        CPU
                                    </label>
                                    <label className="me-3">
                                        <input
                                            type="checkbox"
                                            name="graph-transf"
                                        />
                                        TRANSIÇÕES
                                    </label>
                                </div>
                            </div>

                            {/* <div className="col-3">
                <select className="form-select" name="drop">
                    <option selected>PARÂMETROS</option>
                    <option value="1">Opção 1</option>
                    <option value="2">Opção 2</option>
                    <option value="3">Opção 3</option>
                </select>
            </div>


            <div className="col-4">
                <label htmlFor="customRange2" className="form-label">Range</label>
                <input type="range" className="form-range" min="0" max="5" id="customRange2" />
            </div>

            <div className="col-auto">
                <input className="form-check-input" type="checkbox" name="check-1" />
                <label className="form-check-label me-3"> Opção 1 </label>
                <input className="form-check-input" type="checkbox" name="check-2" />
                <label className="form-check-label me-3"> Opção 2 </label>
                <input className="form-check-input" type="checkbox" name="check-3" />
                <label className="form-check-label me-3"> Opção 3 </label>
            </div> */}

                            <button
                                className="btn btn-primary me-3"
                                type="reset"
                            >
                                Reset
                            </button>
                            <button type="submit" className="btn btn-success">
                                Start
                            </button>
                            {/* <button onClick={()=>{initServer('')}} className="btn btn-success me-3">Start</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FormController;
