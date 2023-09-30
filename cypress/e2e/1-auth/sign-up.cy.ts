/// <reference types="cypress" />

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789qwertyuiopasdfghjklzxcvbnm", 10);

describe("Sign Up", () => {
  beforeEach(() => {
    cy.visit("/sign-up");
  });

  it("Successful Sign Up", () => {
    cy.get('[data-testid="firstName"]').type(`FirstName${nanoid()}`);
    cy.get('[data-testid="lastName"]').type(`LastName${nanoid()}`);
    cy.get('[data-testid="email"]').type(`test${nanoid()}@example.com`);
    cy.get('[data-testid="password"]').type(nanoid());
    cy.get('[data-testid="sign-up-submit"]').click();
    cy.location("pathname").should("not.include", "/sign-up");
  });

  it("Fail on Sign Up with existing email", () => {
    const email = `test${nanoid()}@example.com`;
    cy.get('[data-testid="firstName"]').type(`FirstName${nanoid()}`);
    cy.get('[data-testid="lastName"]').type(`LastName${nanoid()}`);
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(nanoid());
    cy.get('[data-testid="sign-up-submit"]').click();
    cy.get('[data-testid="profile-menu-item"]').click();
    cy.get('[data-testid="logout-menu-item"]').click();
    cy.get('[data-testid="profile-menu-item"]').should("not.exist");
    cy.visit("/sign-up");
    cy.get('[data-testid="firstName"]').type(`FirstName${nanoid()}`);
    cy.get('[data-testid="lastName"]').type(`LastName${nanoid()}`);
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(nanoid());
    cy.get('[data-testid="sign-up-submit"]').click();
    cy.get('[data-testid="email-error"]').should("be.visible");
  });
});
