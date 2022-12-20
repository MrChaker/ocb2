import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import ButtonInstance from "../components/Button/ButtonInstance";
import AuthContext from "../components/context/authContext";
import PopUp from "../components/PopUp";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const pass = useRef<HTMLInputElement>(null!);
    const [errMsg, setErrMsg] = useState(false);

    const handleKey = (e: KeyboardEvent) => {
        if (e.key == "Enter") {
            CheckPass(pass.current.value);
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, []);

    const navigate = useNavigate();
    const CheckPass = (pass: string) => {
        if (pass == localStorage.getItem("auth")) {
            setAuth(true);
            navigate("/choose-ocb");
        } else {
            setErrMsg(true);
            setTimeout(() => {
                setErrMsg(false);
            }, 2000);
        }
    };
    return (
        <div className="flex flex-col gap-5 m-auto">
            <h1 className="font-bold text-4xl">Please Enter Password</h1>
            <input
                ref={pass}
                autoFocus
                data-testid="login"
                type="password"
                className="p-2 w-full rounded-md border border-grey-100 focus-within:border-2 focus-within:border-grey-200"
            />
            <ButtonInstance
                text="Login"
                style="w-full py-2"
                onClick={() => CheckPass(pass.current.value)}
            />
            <PopUp text="Password wrong" visibile={errMsg} />
        </div>
    );
};

export default Login;
