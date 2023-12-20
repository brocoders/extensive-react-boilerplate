/// <reference types="cypress" />

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789qwertyuiopasdfghjklzxcvbnm", 10);

describe("Sign Up", () => {
  beforeEach(() => {
    cy.visit("/sign-up");
  });

  it("Successful Sign Up", () => {
    cy.getBySel("firstName").type(`FirstName${nanoid()}`);
    cy.getBySel("lastName").type(`LastName${nanoid()}`);
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
      lastName: `LastName${nanoid()}`
    })

    cy.getBySel("firstName").type(`FirstName${nanoid()}`);
    cy.getBySel("lastName").type(`LastName${nanoid()}`);
    cy.getBySel("email").type(email);
    cy.getBySel("password").type(nanoid());
    cy.getBySel("sign-up-submit").click();
    cy.getBySel("email-error").should("be.visible")
    .and('contain.text', 'Email already exists');
  });

  it("Check validation of rquired fields errors", () => {
    cy.getBySel("sign-up-submit").click();
    cy.getBySel("firstName-error").should("be.visible")
    .and("contain.text", "First Name is required")

    cy.getBySel("lastName-error").should("be.visible")
    .and("contain.text", "Last Name is required")

    cy.getBySel("email-error").should("be.visible")
    .and("contain.text", "Email is required")

    cy.getBySel("password-error").should("be.visible")
    .and("contain.text", "Password must be at least 6 characters long")

    cy.getBySel("firstName").type(`FirstName${nanoid()}`)
    cy.getBySel("firstName-error").should("not.exist")

    cy.getBySel("lastName").type(`LastName${nanoid()}`)
    cy.getBySel("lastName-error").should("not.exist")

    cy.getBySel("email").type(`test${nanoid()}@example.com`)
    cy.getBySel("email-error").should("not.exist")

    cy.getBySel("password").type(nanoid())
    cy.getBySel("password-error").should("not.exist")

    cy.getBySel("sign-up-submit").click()
    cy.location("pathname").should("not.include", "/sign-up");
  })

  it("Check validation for password", () => {
    cy.getBySel("firstName").type(`FirstName${nanoid()}`);
    cy.getBySel("lastName").type(`LastName${nanoid()}`);
    cy.getBySel("email").type(`test${nanoid()}@example.com`);

    cy.getBySel("password").type('p{enter}');
    cy.getBySel("password-error").should("be.visible")
    .and("contain.text", "Password must be at least 6 characters long");

    cy.getBySel("password").type('assw{enter}');
    cy.getBySel("password-error").should("be.visible")
    .and("contain.text", "Password must be at least 6 characters long");

    cy.getBySel("password").type('1{enter}')
    cy.getBySel("password-error").should("not.exist");

    cy.getBySel("password").type('{backspace}')
    .and("contain.text", "Password must be at least 6 characters long");
  })
});