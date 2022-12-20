import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import ButtonInstance from "../../components/Button/ButtonInstance";
import { POSConfigContext } from "../../components/context/posConfigContext";
import { ProgressContext } from "../../components/context/progress";
import DropDown, { Item } from "../../components/dropDown";
import PopUp from "../../components/PopUp";

const Pos = () => {
    const [posSelected, setPosSelected] = useState(false);
    const navigate = useNavigate();
    const dd = useRef<HTMLSelectElement>(null!);
    const { pos, setPos } = useContext(POSConfigContext);
    const [errMsg, setErrMsg] = useState(false);
    const submit = (value: string) => {
        if (posSelected) {
            setPos({
                ...pos,
                type: "integration",
                integration: value,
            });
            navigate("/which-pos");
        } else {
            setErrMsg(true);
            setTimeout(() => {
                setErrMsg(false);
            }, 2000);
        }
    };
    const { setProgress } = useContext(ProgressContext);
    useEffect(() => {
        if (!pos) navigate("/choose-ocb");
        setProgress(100 / 3);
        if (pos?.integration) {
            dd.current.value = pos.integration;
            setPosSelected(true);
        }
    }, []);
    return (
        <>
            <div className="flex flex-col gap-8 justify-between items-center h-full">
                <h1 className="text-4xl font-bold">Choose point of sales</h1>
                <DropDown ref={dd} onChange={() => setPosSelected(true)}>
                    <Item name="-- Select POS --" hidden />
                    <Item value="NCR" name="NCR Integration" />
                    <Item value="Toast" name="Toast Integration" />
                    <Item value="Square" name="Square Integration" />
                    <Item value="Focus" name="Focus Integration" />
                    <Item value="Clover" name="Clover Integration" />
                    <Item value="Future" name="Future POS Integration" />
                    <Item value="Quik" name="Quik POS Integration" />
                </DropDown>

                <ButtonInstance
                    text="NEXT"
                    style="w-full mb-10 py-2"
                    onClick={() => submit(dd.current.value)}
                />
            </div>
            <PopUp text="Please select an option" visibile={errMsg} />
        </>
    );
};

export default Pos;
