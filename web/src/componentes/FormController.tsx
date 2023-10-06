import StartButton from "./StartButton";

const MyForm = ({func:any}) => {
    function handleSubmit(e: any) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="col-3">
                <select className="form-select" name="drop">
                    <option selected>PARÂMETROS</option>
                    <option value="1">Opção 1</option>
                    <option value="2">Opção 2</option>
                    <option value="3">Opção 3</option>
                </select>
            </div>
            <hr />
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
                <div className="col-auto">
                    <input className="form-check-input" type="checkbox" name="check-1"  />
                    <label className="form-check-label me-3"> Option 1 </label>
                    <input className="form-check-input" type="checkbox" name="check-2"  />
                    <label className="form-check-label me-3"> Option 2 </label>
                    <input className="form-check-input" type="checkbox" name="check-3"  />
                    <label className="form-check-label me-3"> Option 3 </label>
                </div>
            <hr />
            <button className="btn btn-primary me-3" type="reset">Reset form</button>
            <button onClick={func} className="btn btn-success me-3">Submit form</button>
            {/* <StartButton onClick={func} /> */}
        </form>
    );
}
export default MyForm;
