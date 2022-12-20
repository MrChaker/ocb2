import { AiOutlineWarning } from "react-icons/ai";

type PropsType = {
    text: string;
    visibile: boolean;
};

const PopUp = (props: PropsType) => {
    return (
        <div
            data-testid="popup"
            className={`p-4 rounded-md bg-grey-100 absolute left-1/2 top-20 -translate-x-1/2 transition-all border-t-4 border-red-700 text-2xl ${
                props.visibile ? "block" : "hidden"
            }`}>
            <AiOutlineWarning className="inline -mt-2 mr-2" />
            {props.text}
        </div>
    );
};

export default PopUp;
