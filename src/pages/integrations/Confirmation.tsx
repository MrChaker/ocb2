import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button/Button";
import ButtonInstance from "../../components/Button/ButtonInstance";
import { POSConfigContext } from "../../components/context/posConfigContext";
import { ProgressContext } from "../../components/context/progress";

const Confirmation = () => {
    const { pos } = useContext(POSConfigContext);
    const { setProgress } = useContext(ProgressContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!pos) navigate("/choose-ocb");

        setProgress(100);
    }, []);
    const setPOSinLocalStorage = () => {
        localStorage.setItem("POS-config", JSON.stringify(pos));
        navigate("/welcome");
    };
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <h1 className="text-4xl font-bold">Confirm your choices</h1>
                <p className="mt-8">OCB: {pos?.type}</p>
                <p>Integration: {pos?.integration}</p>
                <p>POS Id: {pos?.posID}</p>
                <p>POS Token: {pos?.posToken}</p>
                <ButtonInstance
                    text="CONFIRM"
                    style="m-auto mt-8"
                    onClick={setPOSinLocalStorage}
                />
            </div>
        </div>
    );
};

export default Confirmation;
