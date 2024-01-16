import { useState } from "react";
import CpuOptions from "./CpuOptions";
import TransferOptions from "./TrasferOptions";

interface FormProp {
    initServer: (params: Array<string>) => void;
}

const FormController = ({ initServer }: FormProp) => {
    const [cpuOptionsVisibility, setCpuOptionsVisibility] =
        useState<boolean>(false);
    const [transferOptionsVisibility, setTransferOptionsVisibility] =
        useState<boolean>(false);

    const showCpuOptions = () => {
        setCpuOptionsVisibility(!cpuOptionsVisibility);
    };

    const showTransferOptions = () => {
        setTransferOptionsVisibility(!transferOptionsVisibility);
    };

    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log(formData)
        const formJson = Object.fromEntries(formData.entries());
        console.log(...Object.keys(formJson));
        initServer(Object.keys(formJson));
    }

    return (
        <div className="container mx-12 my-8">
            <div className="flex bg-my_blue rounded-t py-3 px-4">
                <h2 className="text-2xl text-slate-100">Setup</h2>
            </div>
            {/* config category boards */}
        </div>
    );
};


export default FormController;
