import OptionsBoard from "./OptionsBoard";

interface FormProp {
    initServer: (params: Array<string>) => void;
}

const FormController = ({ initServer }: FormProp) => {
    function handleSubmit(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log(formData);
        const formJson = Object.fromEntries(formData.entries());
        console.log(...Object.keys(formJson));
        initServer(Object.keys(formJson));
    }

    return (
        <div className="container mx-auto my-8">
            <div className="flex bg-my_blue rounded-t py-3 px-4 justify-center md:justify-normal">
                <h2 className="text-2xl text-slate-100">Setup</h2>
            </div>
            <div className="flex flex-row justify-between px-4 py-2 flex-wrap md:flex-nowrap">
                <OptionsBoard />
                <OptionsBoard />
                <OptionsBoard />
            </div>
            <div className="flex flex-row justify-evenly flex-wrap ">
                <OptionsBoard />
                <OptionsBoard />
            </div>
            {/* config category boards */}
        </div>
    );
};

export default FormController;
