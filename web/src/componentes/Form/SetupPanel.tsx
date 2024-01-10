import SetupForm from "./SetupForm";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, CheckboxInput, RangeInput } from "./InputTypes";

interface FormProp {
    initServer: (params: Array<string>) => void;
}

const SetupPanel = ({ initServer }: FormProp) => {
    function onSubmitButtonPressed(e: any) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log(formData);
        const formJson = Object.fromEntries(formData.entries());
        console.log(...Object.keys(formJson));
        initServer(Object.keys(formJson));
    }

    function ResetFunction() {
        // do something
    }

    return (
        <div className="container mx-auto my-8">
            <div className="flex bg-my_blue rounded-t py-3 px-4 justify-center">
                <h2 className="text-2xl text-slate-100">Setup</h2>
            </div>
            <div className=" bg-slate-200 rounded-b">
                <SetupForm submitFunction={onSubmitButtonPressed} resetFunction={ResetFunction}>
                    <OptionsBoard>
                        <TextInput name="teste4">TESTE</TextInput>
                        <RangeInput name="teste3">TESTE</RangeInput>
                        <div className="flex flex-row justify-around">
                            <SwitchInput name='teste1'>TESTE</SwitchInput>
                            <CheckboxInput name="teste2">TESTE</CheckboxInput>
                        </div>
                    </OptionsBoard>
                    <OptionsBoard />
                    <OptionsBoard />
                    <OptionsBoard />
                    <OptionsBoard />
                    <OptionsBoard />
                </SetupForm>
            </div>

        </div>
    );
};

export default SetupPanel;
