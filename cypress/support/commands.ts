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
    cy.visit("/sign-up");
    cy.get('[data-testid="firstName"]').type(firstName);
    cy.get('[data-testid="lastName"]').type(lastName);
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="sign-up-submit"]').click();
  }
);

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
    }
  }
}
