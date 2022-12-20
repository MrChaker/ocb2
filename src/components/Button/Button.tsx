import { ReactElement } from "react";
type PropsType = {
    block?: boolean;
    rounded?: boolean;
    outline?: boolean;
    right?: boolean;
    size?: string;
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    text?: string;
    type?: "button" | "submit" | "reset";
    style?: string;
    testid?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Button = (props: PropsType) => {
    return (
        <button
            data-testid={props.testid}
            id="btn"
            type={props.type}
            onClick={(e) => props.onClick && props.onClick(e)}
            className={`cursor-pointer text-xl p-4 px-8 ${
                props.rounded ? "rounded-full" : "rounded-md"
            } justify-center transition-all border-2 border-solid flex items-center ${
                props.block ? "w-full" : ""
            } ${props.right ? "ml-auto" : ""} ${props.style}`}>
            <p className="mr-4 inline-block">{props.leftIcon}</p>
            <p className="pointer-events-none"> {props.text} </p>
            <p className="ml-4 inline-block">{props.rightIcon}</p>
        </button>
    );
};
