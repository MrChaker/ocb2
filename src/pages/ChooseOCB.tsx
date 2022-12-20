import { useContext, useEffect } from "react";
import { ProgressContext } from "../components/context/progress";
import { POSConfigContext } from "../components/context/posConfigContext";
import { useNavigate } from "react-router";
import ButtonInstance from "../components/Button/ButtonInstance";
const ChooseOCB = () => {
    const { pos, setPos } = useContext(POSConfigContext);
    const { setProgress } = useContext(ProgressContext);
    const navigate = useNavigate();
    useEffect(() => {
        setProgress(0);
    }, []);
    return (
        <div className="flex flex-col justify-between h-full w-fit">
            <div>
                <h1 className="text-4xl font-bold text-center">
                    Choose OCB you prefer
                </h1>
                <div className="flex mt-14 gap-16">
                    <ButtonInstance
                        testid="inputOption"
                        text="INPUT"
                        style="w-60"
                        onClick={() => {
                            setPos({
                                type: "input",
                            });
                            localStorage.setItem(
                                "POS-config",
                                JSON.stringify({
                                    type: "input",
                                })
                            );
                            navigate("/stream");
                        }}
                    />
                    <ButtonInstance
                        testid="integration"
                        text="INTEGRATION"
                        style="w-60"
                        onClick={() => {
                            setPos({
                                ...pos,
                                type: "integration",
                            });
                            navigate("/pos");
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChooseOCB;
