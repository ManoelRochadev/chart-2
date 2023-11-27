
const TransferOptions = () => {
    return (
        <div className="card transfer-options mx-1 p-3">
            <div className="col-auto">
                <select className="form-select" name="drop">
                    <option selected>PARÂMETROS</option>
                    <option value="1">Opção 1</option>
                    <option value="2">Opção 2</option>
                    <option value="3">Opção 3</option>
                </select>
            </div>


            <div className="col-auto mt-2">
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
            </div>
        </div>
    )
}

export default TransferOptions;
