const StartButton = (click: any) => {

    return (
        <button onClick={click} className="btn btn-success me-3" type="submit">
            Submit form
        </button>
    );
};

export default StartButton;
