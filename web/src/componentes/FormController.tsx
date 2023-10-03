const FormControlerPanel = () => {
    // requisição
    
    return (
        <div className="container form-controler-panel">
            <div className="row bg-light justify-content-center rounded">
                <div className="form-check">
                    <div className="col">
                        <input className="form-check-input" id="option1" value='' type="checkbox" />
                        <label className='form-check-label text-left' htmlFor="option1">grafico cpu</label>
                    </div>
                </div>
                <div className="form-check">
                    <input className="form-check-input" id="option2" value='' type="checkbox" />
                    <label className='form-check-label text-left' htmlFor="option2">grafico transições</label>
                </div>
            
            </div>
        </div>

    )
}

export default FormControlerPanel;