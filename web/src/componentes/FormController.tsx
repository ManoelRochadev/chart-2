const FormControlerPanel = () => {
    return (
        <div className="container form-controler-panel">
            <div className="row bg-light justify-content-center rounded">
                <div className="form-check">
                    <div className="col">
                        <input className="form-check-input" id="option1" value='' type="checkbox" />
                        <label className='form-check-label text-left' htmlFor="option1">Heeeyyyy</label>
                    </div>
                </div>
                <div className="form-check">
                    <input className="form-check-input" id="option2" value='' type="checkbox" />
                    <label className='form-check-label text-left' htmlFor="option2">Heeeyyyy</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" id="option3" value='' type="checkbox" />
                    <label className='form-check-label text-left' htmlFor="option3">Heeeyyyy</label>
                </div>
            
            </div>
        </div>

    )
}

export default FormControlerPanel;