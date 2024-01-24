/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add(
  "createNewUser",
  ({ firstName, lastName, email, password }) => {
    cy.request("POST", `${Cypress.env("apiUrl")}/v1/auth/email/register`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  }
);

Cypress.Commands.add("getBySel", (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});

Cypress.Commands.add("login", ({ email, password }) => {
  const signinPath = "/sign-in";

  cy.intercept("POST", "/api/v1/auth/email/login").as("login");

  cy.location("pathname").then((currentPath) => {
    if (currentPath !== signinPath) {
      cy.visit(signinPath);
    }
  });

  cy.getBySel("email").type(email);
  cy.getBySel("password").type(password);
  cy.getBySel("sign-in-submit").click();
  cy.wait("@login");
  cy.location("pathname").should("not.include", "/sign-in");
});

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      createNewUser(params: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
      }): Chainable<void>;
      getBySel(selector: string): Chainable<JQuery<HTMLElement>>;
      login(params: { email: string; password: string }): Chainable<void>;
    }
  }
}
