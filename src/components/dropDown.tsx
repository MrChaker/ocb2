import React, { ReactNode } from "react";

type PropsType = {
    children: ReactNode;
    style?: string;
    onChange?: () => void;
    ref?: React.MutableRefObject<HTMLSelectElement>;
};

const DropDown = React.forwardRef<HTMLSelectElement, PropsType>(
    (props, ref) => {
        return (
            <select
                role="dropDown"
                ref={ref}
                onChange={props.onChange}
                className={`p-2 w-full rounded-md ${props.style} border border-grey-100 focus-within:border-2 focus-within:border-grey-200  `}>
                {props.children}
            </select>
        );
    }
);

export const Item = (props: {
    value?: string;
    name: string;
    hidden?: boolean;
    onClick?: () => void;
}) => {
    return (
        <option
            value={props.value || ""}
            hidden={props.hidden}
            onClick={() => props.onClick && props.onClick()}>
            {props.name}
        </option>
    );
};

export default DropDown;
