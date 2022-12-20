import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ButtonInstance from "./Button/ButtonInstance";
import FileInput from "./FileInput";

type PropsType = {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    visible: boolean;
    bgImage: HTMLImageElement;
    logoImage: HTMLImageElement;
};
const CustomizationForm = ({
    setVisible,
    bgImage,
    logoImage,
    visible,
}: PropsType) => {
    const bgImageInput = useRef<HTMLInputElement>(null!);
    const logoInput = useRef<HTMLInputElement>(null!);
    const textInput = useRef<HTMLInputElement>(null!);

    const uploadFile = (
        Imagefile: File | null | undefined,
        type: "Logo" | "background",
        ref: HTMLImageElement
    ): void => {
        if (Imagefile) {
            const reader = new FileReader();
            const file: any = Imagefile;
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result == "string") {
                    ref.src = reader.result;
                    localStorage.setItem(type, reader.result);
                }
            };
        } else {
            // no Image file which means logo will be not used
            if (type == "Logo") {
                localStorage.setItem(type, "hidden");
            }
        }
    };

    function handleChanges(e: ClickEvent): void {
        e.preventDefault();
        uploadFile(bgImageInput.current.files?.item(0), "background", bgImage);
        uploadFile(logoInput.current.files?.item(0), "Logo", logoImage);
        localStorage.setItem(
            "welcome-screen-text",
            textInput.current.value || "hidden"
        );
        setTimeout(() => {
            setVisible(false);
        }, 10);
    }

    return (
        <form
            data-testid="customisationForm"
            className={`z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 px-10 rounded-md bg-slate-100 ${
                visible ? "flex flex-col" : "hidden"
            }`}>
            <Link
                to="/choose-ocb"
                className="text-md text-primary-200 font-bold text-center mb-1">
                Click here if you want to reset pos settings
            </Link>
            <h2 className="text-3xl text-grey-200 font-bold text-center mb-4">
                Change welcome screen
            </h2>
            <label htmlFor="image">1. background</label>
            <FileInput
                text="Upload a picture"
                name="bgImage"
                ref={bgImageInput}
            />
            <label htmlFor="logo">2. Logo ( optional )</label>
            <FileInput
                text="Upload a picture"
                name="LogoImage"
                ref={logoInput}
            />
            <label htmlFor="text">3. Text ( optional )</label>
            <input
                ref={textInput}
                data-testid="textInput"
                name="text"
                type="text"
                className="p-2 w-full rounded-md border border-grey-100 focus-within:border-2 focus-within:border-grey-200 my-2"
            />
            <ButtonInstance
                testid="save"
                text="SAVE"
                style="py-2 mt-6"
                type="submit"
                onClick={(
                    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                    handleChanges(e as ClickEvent);
                }}
            />
        </form>
    );
};

export interface ClickEvent
    extends React.MouseEvent<HTMLButtonElement, MouseEvent> {
    target: ClickEventTarget;
}
interface ClickEventTarget extends EventTarget {
    form: HTMLFormElement;
    bgImage: HTMLInputElement;
    LogoImage: HTMLInputElement;
    text: HTMLInputElement;
}

export default CustomizationForm;
