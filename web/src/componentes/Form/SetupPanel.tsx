import SetupForm from "./SetupForm";
import OptionsBoard from "./OptionsBoard";
import { TextInput, SwitchInput, CheckboxInput, RangeInput } from "./InputTypes";

interface FormProp {
    initServer: (params: Array<string>) => void;
}

const SetupPanel = ({ initServer }: FormProp) => {
    function onSubmitButtonPressed(e: any) {
        e.preventDefault();
        // Element.prototype.par
        const form = e.target.form;
        const formData = new FormData(form);
        // console.log(formData);
        const formJson = formData.entries();
        console.log(...formJson);
        
        // initServer(Object.keys(formJson));
    }

    function ResetFunction() {
        // do something
    }

    return (
        <div className="grid container mx-auto my-8 justify-center ">
            <div className="flex w-[90vw] bg-my_blue rounded-t py-3 px-4 justify-center">
                <h2 className="text-2xl text-slate-100">Setup</h2>
            </div>
            <div className="w-[90vw] bg-slate-200 rounded-b">
                <SetupForm submitFunction={onSubmitButtonPressed} resetFunction={ResetFunction}>
                    <OptionsBoard BoardHeader="TestBoard">
                        <TextInput TextName="teste4" TextPlaceholder="arquivo.txt">TESTE</TextInput>
                        <RangeInput RangeName="teste3">TESTE</RangeInput>
                        
                        <div className="flex justify-around">
                            <SwitchInput SwitchName='teste1'>TESTE</SwitchInput>
                            <CheckboxInput CheckboxName="teste2">TESTE</CheckboxInput>
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
