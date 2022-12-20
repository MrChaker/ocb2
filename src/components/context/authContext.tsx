import { createContext } from "react";

export type AuthContextType = {
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
    auth: false,
    setAuth: () => false,
});

export default AuthContext;
