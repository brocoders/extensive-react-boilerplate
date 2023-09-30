/// <reference types="cypress" />

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789qwertyuiopasdfghjklzxcvbnm", 10);

describe("Sign In", () => {
  let email: string;
  let password: string;

  beforeEach(() => {
    email = `test${nanoid()}@example.com`;
    password = nanoid();

    cy.createNewUser({
      email,
      password,
      firstName: `FirstName${nanoid()}`,
      lastName: `LastName${nanoid()}`,
    });
    cy.get('[data-testid="profile-menu-item"]').click();
    cy.get('[data-testid="logout-menu-item"]').click();
    cy.get('[data-testid="profile-menu-item"]').should("not.exist");
    cy.visit("/sign-in");
  });

  it("Successful Sign In", () => {
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="sign-in-submit"]').click();
    cy.location("pathname").should("not.include", "/sign-in");
  });

  it("Successful Sign In with redirect", () => {
    cy.visit("/profile");
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="sign-in-submit"]').click();
    cy.location("pathname").should("include", "/profile");
  });
});
