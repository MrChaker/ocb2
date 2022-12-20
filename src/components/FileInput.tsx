import React, { useRef } from "react";
type PropsType = {
    text?: string;
    onChange?: () => void;
    name: string;
    ref?: React.MutableRefObject<HTMLInputElement>;
};
const FileInput = React.forwardRef<HTMLInputElement, PropsType>(
    (props, ref) => {
        return (
            <div className="relative">
                <p
                    onClick={() =>
                        document
                            .querySelector<HTMLInputElement>(".fileInput")!
                            .click()
                    }
                    className="absolute top-1/2 left-12 -translate-y-1/2 text-primary-200  cursor-pointer">
                    {props.text}
                </p>
                <input
                    type="file"
                    className="fileInput w-full"
                    name={props.name}
                    ref={ref}
                    onChange={props.onChange}
                />
            </div>
        );
    }
);

export default FileInput;
