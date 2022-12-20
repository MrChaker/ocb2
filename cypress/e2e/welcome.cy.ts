describe("welcome screen", () => {
    it("test welcome screen customisation", () => {
        cy.visit("/welcome");
        cy.get("form").should("not.be.visible");
        cy.get("body").trigger("keydown", {
            key: "Escape",
            code: "Escape",
            charCode: 27,
        });
        cy.get("form").should("be.visible");
        // update only text
        cy.get("input").last().type("Welcome text from test");
        cy.get("button").click();
        // text should be updated
        cy.get("form").should("not.be.visible");
        cy.findByText("Welcome text from test").should("be.visible");
        cy.get("img").last().should("not.be.visible"); // last img is logo , first one is bg
        // update logo
        cy.get("body").trigger("keydown", {
            key: "Escape",
            code: "Escape",
            charCode: 27,
        });
        cy.get(".fileInput").last().attachFile("Logo1.png");
        cy.get("button").click();
        cy.get("img").last().should("be.visible");

        //reloading page or re-launching app should not lose changes
        cy.reload();
        cy.findByText("Welcome text from test").should("be.visible");
    });
});
