import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SocketContextProvider } from "../../components/context/SocketContext";
import PopUp from "../../components/PopUp";

const Orders = () => {
    const { order, disconnectMessage } = useContext(SocketContextProvider);

    const navigate = useNavigate();
    const handleKey = (e: KeyboardEvent) => {
        if (e.key == "Enter") {
            navigate("/welcome");
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, []);

    return (
        <div className="flex w-full">
            <div className="px-16  w-1/2 m-auto pb-12 text-xl min-h-screen flex flex-col justify-between text-center">
                <div>
                    <h1 className="text-5xl font-bold mb-10">Your orders</h1>
                    {!order || order?.items.length == 0 ? (
                        <p>Please make your order</p>
                    ) : (
                        order?.items.map((item, i) => (
                            <div
                                className="flex items-center justify-between p-2 gap-10 w-full m-auto"
                                key={i}>
                                <p>
                                    {" "}
                                    {`${i + 1}. ${item.name} `}
                                    {item.modifiers?.map((mod, i) => (
                                        <span
                                            key={i}
                                            className="font-bold text-sm mr-2 text-primary-200">
                                            {`+ ${mod}`}
                                        </span>
                                    ))}
                                </p>
                                <p>
                                    <span className="font-bold text-md mr-2">
                                        {item.quantity || 1}x
                                    </span>
                                    {` ${item.price}$`}
                                </p>
                            </div>
                        ))
                    )}
                </div>
                <div className="text-2xl font-bold">
                    <p>{`Subtotal: ${
                        order?.finalPrice != undefined &&
                        order?.taxPrice != undefined
                            ? order?.finalPrice - order?.taxPrice
                            : 0
                    }$`}</p>
                    <p>{`taxes: ${order?.taxPrice || 0}$`}</p>
                </div>
            </div>
            <div className="w-1/2 text-6xl flex flex-col gap-10 items-center justify-start border-l-2 border-gray-200">
                {localStorage.getItem("Logo") &&
                    localStorage.getItem("Logo") != "hidden" && (
                        <img src={localStorage.getItem("Logo")!} />
                    )}
                <p>Total Due is :</p>
                <p className="font-bold">{order?.finalPrice}$</p>
            </div>
            <PopUp
                text="Connection lost , please wait we will reconnect you in a second ..."
                visibile={disconnectMessage}
            />
        </div>
    );
};

export default Orders;
