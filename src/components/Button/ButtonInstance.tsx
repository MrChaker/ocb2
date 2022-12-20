import { Button } from "./Button";

type PropsType = {
    text: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    style?: string;
    testid?: string;
    type?: "submit";
};
const ButtonInstance = (props: PropsType) => {
    return (
        <Button
            text={props.text}
            testid={props.testid}
            style={`text-white bg-primary-200 ${props.style}`}
            rounded
            type={props.type}
            onClick={(e) => props.onClick && props.onClick(e)}
        />
    );
};

export default ButtonInstance;
