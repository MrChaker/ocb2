import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";
import { OrderType } from "../../integrations/type";
import { io, Socket } from "socket.io-client";
import { useLocation, useNavigate } from "react-router";

interface SocketContextType {
    order: OrderType;
    disconnectMessage: boolean;
}
export const SocketContextProvider = createContext<SocketContextType>(null!);

const socket = io(import.meta.env.VITE_Server_URL);

type PropsType = {
    integration: string;
    posID: string;
    token?: string;
};
const SocketContext: FC<PropsWithChildren & PropsType> = ({
    children,
    integration,
    posID,
    token,
}) => {
    const [connected, setConnected] = useState(socket.connected);
    const [order, setOrder] = useState<OrderType>(null);
    const [disconnectMessage, setDisconnectMessage] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (socket.connected) {
            socketLogique(socket);
        }
        socket.on("connect", () => {
            setConnected(true);
        });
    }, [disconnectMessage, connected]);

    const socketLogique = (socket: Socket) => {
        socket.emit("integration", {
            integration,
            integrationData: {
                merchantId: posID,
                token: token,
            },
        });

        socket.on("new order", (OrderFromServer: OrderType) => {
            if (location.pathname == "/welcome") navigate("/orders");
            setOrder(OrderFromServer);
        });

        socket.on("order completed", () => {
            navigate("/welcome");
        });

        socket.on("disconnect", () => {
            setDisconnectMessage(true);
            setTimeout(() => {
                socket.connect();
                setDisconnectMessage(false);
            }, 20000);
        });
    };

    return (
        <SocketContextProvider.Provider value={{ order, disconnectMessage }}>
            {children}
        </SocketContextProvider.Provider>
    );
};

export default SocketContext;
