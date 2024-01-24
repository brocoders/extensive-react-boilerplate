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
    cy.visit("/sign-in");
  });

  it("Successful Sign In", () => {
    cy.getBySel("email").type(email);
    cy.getBySel("password").type(password);
    cy.getBySel("sign-in-submit").click();
    cy.location("pathname").should("not.include", "/sign-in");
  });

  it("Successful Sign In with redirect", () => {
    cy.visit("/profile");
    cy.location("pathname").should("include", "/sign-in");
    cy.getBySel("email").type(email);
    cy.getBySel("password").type(password);
    cy.getBySel("sign-in-submit").click();
    cy.location("pathname").should("include", "/profile");
  });

  it("Error should be displayed if password is incorrect", () => {
    cy.intercept("POST", "/api/v1/auth/email/login").as("login");
    cy.getBySel("email").type(email);
    cy.getBySel("password").type("password1");
    cy.getBySel("sign-in-submit").click();
    cy.wait("@login");
    cy.getBySel("password-error").should("be.visible");
  });
});

describe("Validation and error messages", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });
  it("Error messages should be displayed if required fields are empty", () => {
    cy.getBySel("sign-in-submit").click();
    cy.getBySel("email-error").should("be.visible");

    cy.getBySel("password-error").should("be.visible");

    cy.getBySel("email").type("useremail@gmail.com");
    cy.getBySel("email-error").should("not.exist");
    cy.getBySel("sign-in-submit").click();
    cy.getBySel("password-error").should("be.visible");

    cy.getBySel("password").type("password1");
    cy.getBySel("password-error").should("not.exist");

    cy.getBySel("email").clear();
    cy.getBySel("email-error").should("be.visible");
  });
  it("Error message should be displayed if email isn't registered in the system", () => {
    cy.intercept("POST", "/api/v1/auth/email/login").as("login");
    cy.getBySel("email").type("notexistedemail@gmail.com");
    cy.getBySel("password").type("password1");
    cy.getBySel("sign-in-submit").click();
    cy.wait("@login");
    cy.getBySel("email-error").should("be.visible");
  });
});

describe("Check redirects", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });
  it("Check user redirected from sing in to sign up page", () => {
    cy.getBySel("create-account").click();
    cy.url().should("include", "/sign-up");
  });

  it("Check user is navigated to Forgot Password page", () => {
    cy.getBySel("forgot-password").click();
    cy.url().should("include", "/forgot-password");
  });
});
