import StartButton from "./StartButton";

interface FormProp {
    initServer: () => void;
}

const FormController = ({ initServer }: FormProp) => {
    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        fetch('/some-api', { method: form.method, body: formData });

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <p>
                GRAFICOS: <br />
                <label className="me-3">
                    <input type="checkbox" name="graph-1" /> CPU
                </label>
                <label className="me-3">
                    <input type="checkbox" name="graph-2" /> TRANSIÇÕES
                </label>
            </p>
            <hr />
            <div className="col-3">
                <select className="form-select" name="drop">
                    <option selected>PARÂMETROS</option>
                    <option value="1">Opção 1</option>
                    <option value="2">Opção 2</option>
                    <option value="3">Opção 3</option>
                </select>
            </div>
            <hr />

            <div className="col-4">
                <label htmlFor="customRange2" className="form-label">Range</label>
                <input type="range" className="form-range" min="0" max="5" id="customRange2" />

            </div>

            <hr />
            <div className="col-auto">
                <input className="form-check-input" type="checkbox" name="check-1" />
                <label className="form-check-label me-3"> Opção 1 </label>
                <input className="form-check-input" type="checkbox" name="check-2" />
                <label className="form-check-label me-3"> Opção 2 </label>
                <input className="form-check-input" type="checkbox" name="check-3" />
                <label className="form-check-label me-3"> Opção 3 </label>
            </div>
            <hr />
            <button className="btn btn-primary me-3" type="reset">Reset</button>
            <button onClick={initServer} className="btn btn-success me-3">Start</button>
        </form>
    );
}
export default FormController;
