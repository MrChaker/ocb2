import React, { PropsWithChildren, useContext, useState } from "react";
import { Navigate } from "react-router";
import AuthContext from "../context/authContext";
import { ProgressContext } from "../context/progress";
import ProgressBar from "../progress/ProgressBar";

const Dashboard: React.FC<PropsWithChildren> = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [progress, setProgress] = useState(0);

    return (
        <>
            {auth ? (
                <div className="py-12">
                    <ProgressContext.Provider value={{ progress, setProgress }}>
                        <ProgressBar width={progress} />
                        <div className="w-full grid place-content-center mt-32">
                            {children}
                        </div>
                    </ProgressContext.Provider>
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default Dashboard;
