import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import welcome from "../../assets/welcome.webp";
import Logo from "../../assets/Logo1.png";
import CustomizationForm from "../../components/CustomizationForm";

const Welcome = () => {
    const navigate = useNavigate();
    const [configForm, setConfigForm] = useState(false);

    const bgImage = useRef<HTMLImageElement>(null!);
    const logoImage = useRef<HTMLImageElement>(null!);

    const handleKey = (e: KeyboardEvent) => {
        if (e.key == "Enter") navigate("/orders");
        else if (e.key == "Escape") {
            setConfigForm((prev) => !prev);
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <img
                data-testid="welcomeImg"
                ref={bgImage}
                src={localStorage.getItem("background") || welcome}
                alt="/welcome"
                className="w-full h-[140%] -mt-24"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 flex flex-col items-center">
                <img
                    data-testid="logoImg"
                    ref={logoImage}
                    src={localStorage.getItem("Logo") || Logo}
                    alt="company logo"
                    className={`${
                        localStorage.getItem("Logo") == "hidden" ? "hidden" : ""
                    }`}
                />
                <h1
                    data-testid="welcomeText"
                    className={`w-fit text-8xl text-slate-200 font-bold ${
                        localStorage.getItem("welcome-screen-text") == "hidden"
                            ? "hidden"
                            : ""
                    }`}>
                    {localStorage.getItem("welcome-screen-text") || "Welcome"}
                </h1>
            </div>
            <CustomizationForm
                setVisible={setConfigForm}
                visible={configForm}
                bgImage={bgImage.current}
                logoImage={logoImage.current}
            />
        </div>
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

export default Welcome;
