import type { ChangeEventHandler, JSX } from "react";

type InputTypes = "text" | "date" | "email" | "password";
interface ITextInput {
    as?: InputTypes;
    onChange: ChangeEventHandler<HTMLInputElement>;
    icon?: JSX.Element;
}

export default function Input({ as = "text", icon, onChange }: ITextInput) {
    return (
        <div className="relative">
            <input
                type={as}
                data-testid="query-input"
                name="q"
                placeholder="Bijv. KL 1001 of London"
                className="bg-white text-black  font-light  w-full px-4 py-4 rounded-lg outline-0 border border-grey-broken focus:border-morning-pink focus:focus-yellow"
                onChange={onChange}
            />
            {icon && (
                <span className=" text-afternoon-blue pointer-events-none absolute right-2 top-[50%] -translate-y-[50%] w-8">{icon}</span>
            )}
        </div>
    );
}
