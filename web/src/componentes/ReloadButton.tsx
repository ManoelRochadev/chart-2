import React from "react";

type ReloadProps = {
    onButtonClick: () => void;
}

const reloadButton: React.FC<ReloadProps> = ({ onButtonClick }) => {
    return (
        <div className="container reload-button">
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button
                        className="btn btn-primary"
                        onClick={onButtonClick}
                    >
                        Return
                    </button>
                </div>
            </div>
        </div>
    )
}

export default reloadButton;