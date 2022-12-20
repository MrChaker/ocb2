import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChooseOCB from "./ChooseOCB";
import Pos from "./integrations/Pos";
import Stream from "./videoInput/Stream";
import WhichPos from "./integrations/WhichPos";
import VideoStream from "./videoInput/VideoStream";
import Welcome from "./displayScreen/Welcome";
import Dashboard from "../components/layouts/Dashboard";
import Orders from "./displayScreen/Orders";
import { useEffect, useState } from "react";
import {
    POSConfig,
    POSConfigContext,
} from "../components/context/posConfigContext";
import Confirmation from "./integrations/Confirmation";
import AuthContext from "../components/context/authContext";
import SocketContext from "../components/context/SocketContext";
import Login from "./Login";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { getVersion } from "@tauri-apps/api/app";
import { emit, Event, listen } from "@tauri-apps/api/event";
import PopUp from "../components/PopUp";
import { relaunch } from "@tauri-apps/api/process";

function App(props: { initURL?: string }) {
    const [auth, setAuth] = useState<boolean>(false);

    const [pos, setPos] = useState<POSConfig>(
        localStorage.getItem("POS-config")
            ? JSON.parse(localStorage.getItem("POS-config")!)
            : null
    );

    useEffect(() => {
        localStorage.setItem("auth", "1234");
        updateVersion();
        listen("tauri://update-status", function (res: Event<any>) {
            console.log("New status: ", res);
            if (res.payload?.status == "ERROR") setUpdateMsg(res.payload.error);
            else if (res.payload?.status == "PENDING")
                setUpdateMsg(res.payload.pending);
        });
    }, []);

    const [updateMsg, setUpdateMsg] = useState("");
    const updateVersion = async () => {
        try {
            const { shouldUpdate, manifest } = await checkUpdate();
            console.log(manifest);
            if (shouldUpdate) {
                // display dialog
                await installUpdate();
                // install complete, restart the app
                await relaunch();
            } else console.log("no update available");
        } catch (error) {
            setUpdateMsg(error as string);
            console.log(error);
        }
    };
    return (
        <BrowserRouter>
            <AuthContext.Provider value={{ auth, setAuth }}>
                <POSConfigContext.Provider value={{ pos, setPos }}>
                    <div className="flex flex-col items-center gap-5 text-lg text-grey-200 font-main min-h-screen p-6">
                        <PopUp visibile={!!updateMsg} text={updateMsg} />
                        <Routes location={`${props.initURL || ""}`}>
                            <Route
                                path="/"
                                element={
                                    <Navigate
                                        to={`/${
                                            pos == null
                                                ? "choose-ocb"
                                                : pos!.type == "input"
                                                ? "stream"
                                                : "welcome"
                                        }`}
                                    />
                                }
                            />
                            /* configuration screens */
                            <Route
                                path="/choose-ocb"
                                element={<Dashboard children={<ChooseOCB />} />}
                            />
                            <Route path="/stream" element={<Stream />} />
                            <Route
                                path="/pos"
                                element={<Dashboard children={<Pos />} />}
                            />
                            <Route
                                path="/which-pos"
                                element={<Dashboard children={<WhichPos />} />}
                            />
                            <Route
                                path="/confirm-pos"
                                element={
                                    <Dashboard children={<Confirmation />} />
                                }
                            />
                            <Route
                                path="/video-stream/"
                                element={<VideoStream />}
                            />
                            <Route
                                path="/video-stream/:deviceID"
                                element={<VideoStream />}
                            />
                            /* auth */
                            <Route path="/login" element={<Login />} />
                            /* customers orders screen */
                            <Route
                                path="/welcome"
                                element={
                                    <SocketContext
                                        posID={pos?.posID!}
                                        token={pos?.posToken}
                                        integration={pos?.integration!}>
                                        <Welcome />
                                    </SocketContext>
                                }
                            />
                            <Route
                                path="/orders"
                                element={
                                    <SocketContext
                                        posID={pos?.posID!}
                                        token={pos?.posToken}
                                        integration={pos?.integration!}>
                                        <Orders />
                                    </SocketContext>
                                }
                            />
                        </Routes>
                    </div>
                </POSConfigContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
