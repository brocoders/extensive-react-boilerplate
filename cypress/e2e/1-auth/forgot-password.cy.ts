/// <reference types="cypress" />

import { ParsedMail } from "mailparser";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789qwertyuiopasdfghjklzxcvbnm", 10);

describe("Forgot Password Functionality", () => {
  let email: string;
  let password: string;
  let firstName: string;
  let lastName: string;

  beforeEach(() => {
    email = `test${nanoid()}@example.com`;
    password = nanoid();
    firstName = `FirstName${nanoid()}`;
    lastName = `LastName${nanoid()}`;

    cy.createNewUser({
      email,
      password,
      firstName,
      lastName,
    });

    cy.visit("/sign-in");
  });
  context("check forgot password page", () => {
    it("should display forgot password link and navigate to the reset password page", () => {
      cy.getBySel("forgot-password").should("be.visible").click();
      cy.location("pathname").should("include", "/forgot-password");
    });

    it("should show validation messages for invalid inputs", () => {
      cy.visit("/forgot-password");

      // Test submitting without entering an email
      cy.getBySel("send-email").click();
      cy.getBySel("email-error").should("be.visible");

      // Test submitting with an invalid email
      cy.getBySel("email").type("invalidemail");
      cy.getBySel("send-email").click();
      cy.getBySel("email-error").should("be.visible");

      cy.getBySel("email").type(email);
      cy.getBySel("email-error").should("not.exist");
    });

    it("should handle errors for an invalid email", () => {
      cy.intercept("POST", "/api/v1/auth/forgot/password").as("emailSend");

      cy.getBySel("forgot-password").click();
      cy.location("pathname").should("include", "/forgot-password");
      cy.getBySel("email").type("nonexistentemail@mail.com");
      cy.getBySel("send-email").click();

      cy.wait("@emailSend").then((request) => {
        expect(request.response?.statusCode).to.equal(422);
        cy.getBySel("email-error").should("be.visible");
      });
    });
  });

  context("change password", () => {
    const newPassword = "p1ssword";

    beforeEach(() => {
      cy.intercept("POST", "/api/v1/auth/forgot/password").as("emailSend");
      cy.getBySel("forgot-password").click();
      cy.location("pathname").should("include", "/forgot-password");
      cy.getBySel("email").type(email);
      cy.getBySel("send-email").click();
      cy.wait("@emailSend").then((request) => {
        expect(request.response?.statusCode).to.equal(204);
        cy.get("#notistack-snackbar").should("be.visible");
      });
    });

    it("should send a password reset email and navigate to reset password page", () => {
      cy.task("mail:receive", null, { timeout: 40000 }).then((email) => {
        // check that email is ok
        const url = (email as ParsedMail).text?.split(" ")[0];
        if (url) {
          cy.visit(url);
        }
      });
      cy.location("pathname").should("include", "/password-change");
    });

    it("should handle errors for invalid password", () => {
      cy.task("mail:receive", null, { timeout: 40000 }).then((email) => {
        const url = (email as ParsedMail).text?.split(" ")[0];
        if (url) {
          cy.visit(url);
        }
      });

      cy.getBySel("set-password").click();
      cy.getBySel("password-error").should("be.visible");
      cy.getBySel("password-confirmation-error").should("be.visible");
      cy.getBySel("password").type(newPassword);
      cy.getBySel("password-error").should("not.exist");

      cy.getBySel("password-confirmation").type("mismatchpassword");
      cy.getBySel("password-confirmation-error").should("be.visible");
      cy.getBySel("password-confirmation").type(`{selectAll}${newPassword}`);
      cy.getBySel("password-confirmation-error").should("not.exist");
    });

    it("should reset password successfully", () => {
      cy.intercept("POST", "/api/v1/auth/reset/password").as("resetPassword");
      cy.intercept("POST", "/api/v1/auth/email/login").as("login");
      cy.task("mail:receive", null, { timeout: 40000 }).then((email) => {
        const url = (email as ParsedMail).text?.split(" ")[0];
        if (url) {
          cy.visit(url);
        }
      });
      cy.getBySel("password").type(newPassword);
      cy.getBySel("password-confirmation").type(newPassword);
      cy.getBySel("set-password").click();
      cy.wait("@resetPassword").then((request) => {
        expect(request.response?.statusCode).to.equal(204);
        cy.get("#notistack-snackbar").should("be.visible");
      });
      cy.location("pathname").should("include", "/sign-in");

      // check user cannot login with old password
      cy.getBySel("email").type(email);
      cy.getBySel("password").type(password);
      cy.getBySel("sign-in-submit").click();
      cy.wait("@login").then((request) => {
        expect(request.response?.statusCode).to.equal(422);
        cy.getBySel("password-error").should("be.visible");
      });

      // check user is allowed to login with the new password
      cy.getBySel("password").type(`{selectAll}${newPassword}`);
      cy.getBySel("password-error").should("not.exist");
      cy.getBySel("sign-in-submit").click();
      cy.wait("@login").then((request) => {
        expect(request.response?.statusCode).to.equal(200);
      });
      cy.location("pathname").should("not.include", "/sign-in");
    });
  });
});
