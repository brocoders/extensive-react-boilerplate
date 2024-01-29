/// <reference types="cypress" />

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789qwertyuiopasdfghjklzxcvbnm", 10);

describe("Sign Up", () => {
  beforeEach(() => {
    cy.visit("/sign-up");
  });

  it("Successful Sign Up", () => {
    cy.getBySel("first-name").type(`FirstName${nanoid()}`);
    cy.getBySel("last-name").type(`LastName${nanoid()}`);
    cy.getBySel("email").type(`test${nanoid()}@example.com`);
    cy.getBySel("password").type(nanoid());
    cy.getBySel("sign-up-submit").click();
    cy.location("pathname").should("not.include", "/sign-up");
  });

  it("Fail on Sign Up with existing email", () => {
    const email = `test${nanoid()}@example.com`;

    cy.createNewUser({
      email,
      password: nanoid(),
      firstName: `FirstName${nanoid()}`,
      lastName: `LastName${nanoid()}`,
    });

    cy.getBySel("first-name").type(`FirstName${nanoid()}`);
    cy.getBySel("last-name").type(`LastName${nanoid()}`);
    cy.getBySel("email").type(email);
    cy.getBySel("password").type(nanoid());
    cy.getBySel("sign-up-submit").click();
    cy.getBySel("email-error").should("be.visible");
  });

  it("Check validation of rquired fields errors", () => {
    cy.getBySel("sign-up-submit").click();
    cy.getBySel("first-name-error").should("be.visible");
    cy.getBySel("last-name-error").should("be.visible");
    cy.getBySel("email-error").should("be.visible");
    cy.getBySel("password-error").should("be.visible");

    cy.getBySel("first-name").type(`FirstName${nanoid()}`);
    cy.getBySel("first-name-error").should("not.exist");

    cy.getBySel("last-name").type(`LastName${nanoid()}`);
    cy.getBySel("last-name-error").should("not.exist");

    cy.getBySel("email").type(`test${nanoid()}@example.com`);
    cy.getBySel("email-error").should("not.exist");

    cy.getBySel("password").type(nanoid());
    cy.getBySel("password-error").should("not.exist");

    cy.getBySel("sign-up-submit").click();
    cy.location("pathname").should("not.include", "/sign-up");
  });

  it("Check validation for password", () => {
    cy.getBySel("first-name").type(`FirstName${nanoid()}`);
    cy.getBySel("last-name").type(`LastName${nanoid()}`);
    cy.getBySel("email").type(`test${nanoid()}@example.com`);

    cy.getBySel("password").type("p{enter}");
    cy.getBySel("password-error").should("be.visible");

    cy.getBySel("password").type("assw{enter}");
    cy.getBySel("password-error").should("be.visible");

    cy.getBySel("password").type("1{enter}");
    cy.getBySel("password-error").should("not.exist");

    cy.getBySel("password").type("{backspace}");
    cy.getBySel("password-error").should("be.visible");
  });
});
