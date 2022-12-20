describe("app login & config", () => {
    it("test login", () => {
        cy.visit("/");
        cy.location("href").should("contain", "/login");
        cy.get("input").type("wrong password");
        cy.get("button").click();
        cy.findByText("Password wrong").should("be.visible");
        login();
        cy.location("href").should("contain", "/choose-ocb");
    });

    it("test pos config", () => {
        cy.visit("/choose-ocb");
        login();
        cy.get("button").next().click();
        cy.location("href").should("contain", "/pos");

        // go next without selecting
        cy.get("button").click();
        cy.findByText("Please select an option").should("be.visible");
        cy.get("select").select("Square");
        cy.get("button").click();
        cy.location("href").should("contain", "/which-pos");

        //test using progress bar
        // 4 elements ( progress points ) currently we're at 3rd
        //we can't go to 4th but we can go back
        cy.get(".pr-test").last().click();
        cy.location("href").should("contain", "/which-pos");
        cy.get(".pr-test").next().first().click();
        cy.location("href").should("contain", "/pos");

        cy.get("button").click(); // we're back at which pos
        cy.get("button").click(); // go next without entering info
        cy.findByText(/Please/i).should("be.visible");
        cy.get("input").first().type("pos id 1");
        cy.get("input").last().type("pos token 1");
        cy.get("button").click();
        cy.location("href").should("contain", "/confirm-pos");

        cy.get("button").click(); // confirm
        cy.location("href").should("contain", "/welcome");

        // info should be saved if we launch app again we go directly to the welcome
        cy.visit("/");
        cy.location("href").should("contain", "/welcome");
    });
});

const login = () => {
    cy.get("input").clear().type("1234");
    cy.get("button").click();
};
