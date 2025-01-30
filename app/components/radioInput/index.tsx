import { twMerge } from "tailwind-merge";
import styles from "./style.module.scss";

interface IRadioInput {
    id: string;
    label: string;
    className?: string;
    checked?: boolean;
}

export default function RadioInput({ id, label, className, checked = false }: IRadioInput) {
    return (
        <div key={`flight-type-${id}`} className={twMerge(styles.radio, className)}>
            <input
                id={id}
                type="radio"
                name="flightType"
                value={label}
                defaultChecked={checked}
                data-testid={`radio-${id}`}
            />
            <label data-testid={`radio-label-${id}`} htmlFor={id}>
                {label}
            </label>
        </div>
    );
}
