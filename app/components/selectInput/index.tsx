import { ArrowDown } from "../icons";

interface ITextInput {
    children: React.ReactElement | React.ReactElement[];
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string;
    testId?: string;
}

function SelectInput({ children, onChange, value, testId }: ITextInput) {
    return (
        <div className="relative">
            <select
                name="datetime"
                className="bg-white font-light text-black pl-4 pr-11 py-4 w-full border border-grey-broken appearance-none rounded-lg outline-0 focus:border-morning-pink focus:focus-yellow"
                onChange={onChange}
                defaultValue={value}
                data-testid={testId}
            >
                {children}
            </select>

            <ArrowDown className="absolute top-[50%] right-3 -translate-y-[50%] pointer-events-none text-afternoon-blue" />
        </div>
    );
}

interface IOption {
    children: string;
    value: string;
}
const Option = ({ children, value }: IOption) => {
    return <option value={value}>{children}</option>;
};

SelectInput.Option = Option;

export default SelectInput;
