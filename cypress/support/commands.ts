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
    }
  }
}
