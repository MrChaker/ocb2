import { fireEvent, render, screen } from "@testing-library/react";
import App from "../pages/_App";

describe("testing app lunch", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("rendered correctly", async () => {
        expect(location.pathname).toBe("/login");
        //false login
        falseLogin(screen.getByTestId("login"));
        expect(screen.getByTestId("popup")).toBeVisible();
        //real login
        login(screen.getByTestId("login"));
        expect(location.pathname).toBe("/choose-ocb");
    });

    test("testing pos setup ( stream case ) ", () => {
        login(screen.getByTestId("login"));
        fireEvent.click(screen.getByTestId("inputOption"));
        expect(location.pathname).toBe("/stream");
        // If we re-launch the app again we should go directly to stream
        location.assign("/");
        expect(location.pathname).toBe("/stream");
    });

    test("testing pos setup ( integration case ) ", () => {
        fireEvent.click(screen.getByTestId("change ocb"));

        expect(location.pathname).toBe("/login");
        login(screen.getByTestId("login"));
        expect(location.pathname).toBe("/choose-ocb");

        fireEvent.click(screen.getByTestId("integration"));
        expect(location.pathname).toBe("/pos");

        // Make sure we can go to prev and can't go to next steps using progress bar
        const ProgressPoint = screen.getAllByRole("ProgressPoint");
        //we are at PP[1]

        fireEvent.click(ProgressPoint[0]); //
        expect(location.pathname).toBe("/choose-ocb");

        fireEvent.click(screen.getByText("INTEGRATION"));
        fireEvent.click(ProgressPoint[2]); // link to /which-ocb but not without selection pos
        expect(location.pathname).toBe("/pos");

        fireEvent.click(screen.getByText("NEXT")); // shoud pop error alert ( no selection )
        expect(screen.getByTestId("popup")).toBeVisible();

        fireEvent.change(screen.getByRole("dropDown"), {
            target: { value: "NCR" },
        });
        fireEvent.click(screen.getByText("NEXT")); // shoud work now
        expect(location.pathname).toBe("/which-pos");

        fireEvent.click(ProgressPoint[3]); // should be disabled
        expect(location.pathname).toBe("/which-pos");

        fireEvent.click(screen.getByText("NEXT")); // shoud pop error alert ( no input )
        expect(screen.getByTestId("popup")).toBeVisible();

        fireEvent.change(screen.getByTestId("pos-id"), {
            target: { value: "100x" },
        });
        fireEvent.click(screen.getByText("NEXT")); // shoud pop error alert ( only 1 input )
        expect(screen.getByTestId("popup")).toBeVisible();

        fireEvent.change(screen.getByTestId("pos-token"), {
            target: { value: "token 100" },
        });
        fireEvent.click(screen.getByText("NEXT")); // now it works
        expect(location.pathname).toBe("/confirm-pos");

        //go back to change something
        fireEvent.click(ProgressPoint[1]);
        expect(location.pathname).toBe("/pos");

        //we should still have our values selected
        expect(screen.getByRole<HTMLSelectElement>("dropDown").value).toBe(
            "NCR"
        );

        fireEvent.click(screen.getByText("NEXT"));
        expect(location.pathname).toBe("/which-pos");
        expect(screen.getByTestId<HTMLInputElement>("pos-id").value).toBe(
            "100x"
        );
        expect(screen.getByTestId<HTMLInputElement>("pos-token").value).toBe(
            "token 100"
        );
        fireEvent.change(screen.getByTestId("pos-token"), {
            target: { value: "token 101" },
        });
        fireEvent.click(screen.getByText("NEXT"));
        expect(location.pathname).toBe("/confirm-pos");

        fireEvent.click(screen.getByText("CONFIRM"));
        expect(location.pathname).toBe("/welcome");

        //Next Time we re-launch the app we should go directly to /welcome
        location.assign("/");
        expect(location.pathname).toBe("/welcome");
    });
});

const login = (input: HTMLInputElement) => {
    fireEvent.change(input, { target: { value: "1234" } });
    fireEvent.keyDown(window, { key: "Enter", code: "Enter", charCode: 13 });
};

const falseLogin = (input: HTMLInputElement) => {
    fireEvent.change(input, { target: { value: "12q" } });
    fireEvent.keyDown(window, { key: "Enter", code: "Enter", charCode: 13 });
};
