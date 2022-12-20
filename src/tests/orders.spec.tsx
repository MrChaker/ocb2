import { queryByText, render } from "@testing-library/react";
import App from "../pages/_App";
import { SocketServerMock } from "socket.io-mock-ts";

import { OrderType } from "../integrations/type";

const socket = new SocketServerMock();

describe("orders from socket", () => {
    let mockOrder: OrderType;
    beforeEach(() => {
        render(<App initURL="/orders" />);
        mockOrder = {
            items: [
                {
                    name: "Potato",
                    price: 20,
                    quantity: 2,
                },
                {
                    name: "Tomato",
                    modifiers: ["with onion"],
                    price: 23,
                    quantity: 2,
                },
            ],
            taxPrice: 10,
            finalPrice: 53,
        };
    });
    test("should display emmited order", () => {
        expect(queryByText(document.body, "Potato")).not.toBeInTheDocument();
        socket.emit("new order", mockOrder);
        socket.clientMock.on("new order", (order: OrderType) => {
            expect(queryByText(document.body, "Potato")).toBeInTheDocument();
            expect(
                queryByText(document.body, "Total: 53$")
            ).toBeInTheDocument();
        });
    });

    test("should show disconnect message", () => {
        expect(queryByText(document.body, /Connection lost/i)).toHaveClass(
            "hidden"
        );
        socket.clientMock.disconnect();
        socket.clientMock.on("disconnect", () => {
            expect(
                queryByText(document.body, /Connection lost/i)
            ).not.toHaveClass("hidden");
        });
    });
});
