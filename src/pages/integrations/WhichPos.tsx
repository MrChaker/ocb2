import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import ButtonInstance from "../../components/Button/ButtonInstance";
import { POSConfigContext } from "../../components/context/posConfigContext";
import { ProgressContext } from "../../components/context/progress";
import PopUp from "../../components/PopUp";

const WhichPos = () => {
    const { pos, setPos } = useContext(POSConfigContext);
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState(false);

    const submit = (id: string, token: string) => {
        if (id !== "" && token !== "") {
            setPos({
                ...pos,
                type: "integration",
                posID: id,
                posToken: token,
            });
            navigate("/confirm-pos");
        } else {
            setErrMsg(true);
            setTimeout(() => {
                setErrMsg(false);
            }, 2000);
        }
    };
    const dId = useRef<HTMLInputElement>(null!);
    const dToken = useRef<HTMLInputElement>(null!);
    const { setProgress } = useContext(ProgressContext);
    useEffect(() => {
        if (!pos) navigate("/choose-ocb");

        setProgress(200 / 3);
        if (pos?.posID) {
            dId.current.value = pos.posID;
            dToken.current.value = pos.posToken!;
        }
    }, []);
    return (
        <>
            <div className="flex flex-col gap-8 justify-between h-full">
                <h2 className="text-3xl font-bold">
                    Enter your
                    {pos?.integration == "Square" ||
                    pos?.integration == "Clover"
                        ? " merchant id"
                        : pos?.integration == "Focus"
                        ? " venue key"
                        : "POS ID"}
                </h2>

                <input
                    ref={dId}
                    data-testid="pos-id"
                    type="text"
                    className="p-2 w-full rounded-md border border-grey-100 focus-within:border-2 focus-within:border-grey-200"
                />
                <h2 className="text-3xl font-bold">Enter your POS Token</h2>
                <input
                    ref={dToken}
                    data-testid="pos-token"
                    type="text"
                    className="p-2 w-full rounded-md border border-grey-100 focus-within:border-2 focus-within:border-grey-200"
                />

                <ButtonInstance
                    text="NEXT"
                    style="w-full py-2"
                    onClick={() =>
                        submit(dId.current.value, dToken.current.value)
                    }
                />
            </div>
            <PopUp text="Please Enter details" visibile={errMsg} />
        </>
    );
};

export default WhichPos;
