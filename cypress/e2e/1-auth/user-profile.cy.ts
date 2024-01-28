/// <reference types="cypress" />

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789qwertyuiopasdfghjklzxcvbnm", 10);

describe("User Profile", () => {
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

    cy.login({ email, password });
  });

  it("Open user profile and check data is displayed", () => {
    cy.getBySel("PersonIcon").click();
    cy.getBySel("user-profile").click();
    cy.location("pathname").should("include", "/profile");
    cy.getBySel("user-name").should("contain.text", firstName + " " + lastName);
    cy.getBySel("user-email").should("contain.text", email);
    cy.getBySel("edit-profile").click();
    cy.location("pathname").should("include", "/profile/edit");
    cy.get('[data-testid="firstName"] input').should(
      "contain.value",
      firstName
    );
    cy.get('[data-testid="lastName"] input').should("contain.value", lastName);
  });

  it("Update user data", () => {
    cy.intercept("PATCH", "api/v1/auth/me").as("profileUpdate");
    cy.visit("/profile/edit");
    cy.getBySel("firstName").type(`{selectAll}James`);
    cy.get('[data-testid="firstName"] input').should("contain.value", "James");
    cy.getBySel("lastName").type(`{selectAll}Bond`);
    cy.get('[data-testid="lastName"] input').should("contain.value", "Bond");
    cy.getBySel("save-profile").click();

    cy.wait("@profileUpdate").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });

    cy.visit("/");
    cy.getBySel("PersonIcon").click();
    cy.getBySel("user-profile").click();
    cy.location("pathname").should("include", "/profile");
    cy.getBySel("user-name").should("contain.text", "James Bond");
    cy.getBySel("user-email").should("contain.text", email);
    cy.getBySel("edit-profile").click();
    cy.location("pathname").should("include", "/profile/edit");
    cy.getBySel("firstName")
      .children("div")
      .children("input")
      .should("contain.value", "James");
    cy.getBySel("lastName")
      .children("div")
      .children("input")
      .should("contain.value", "Bond");
  });

  it("Upload profile image", () => {
    cy.fixture("profileImage.jpg", null).as("userImage");
    cy.intercept("PATCH", "api/v1/auth/me").as("profileUpdate");
    cy.intercept("POST", "api/v1/files/upload").as("uploadFile");
    cy.visit("/profile/edit");
    cy.get("input[type=file]").selectFile("@userImage", {
      force: true,
      action: "drag-drop",
    });
    cy.wait("@uploadFile").then((request) => {
      expect(request.response?.statusCode).to.equal(201);
      cy.get("img")
        .should("be.visible")
        .and("have.attr", "src", request.response?.body.path);
    });
    cy.getBySel("save-profile").click();
    cy.wait("@profileUpdate").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
      cy.getBySel("cancel-editProfile").click();
      cy.get("img")
        .should("be.visible")
        .and("have.attr", "src", request.response?.body.photo.path);
    });
  });

  it("Whant to leave page", () => {
    cy.visit("/profile/edit");

    cy.getBySel("firstName").type(`{selectAll}James`);
    cy.getBySel("cancel-editProfile").click();

    cy.getBySel("want-to-leave-modal").should("be.visible");
    cy.getBySel("stay").click();

    cy.getBySel("want-to-leave-modal").should("not.exist");
    cy.location("pathname").should("include", "/profile/edit");
    cy.get('[data-testid="firstName"] input').should("contain.value", "James");

    cy.getBySel("cancel-editProfile").click();
    cy.getBySel("want-to-leave-modal").should("be.visible");
    cy.getBySel("leave").click();
    cy.location("pathname").should("include", "/profile");
    cy.getBySel("user-name")
      .should("be.visible")
      .and("contain.text", firstName + " " + lastName);
    cy.getBySel("user-email").should("be.visible").and("contain.text", email);
  });

  it("Change user password", () => {
    const newPassword = "passw1";
    cy.intercept("PATCH", "api/v1/auth/me").as("profileUpdate");
    cy.intercept("POST", "api/v1/auth/logout").as("logout");
    cy.intercept("POST", "/api/v1/auth/email/login").as("login");

    cy.visit("/profile/edit");
    cy.getBySel("oldPassword").type(password);
    cy.getBySel("newPassword").type(newPassword);
    cy.getBySel("passwordConfirmation").type(newPassword);
    cy.getBySel("save-password").click();
    cy.wait("@profileUpdate").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });

    cy.getBySel("profile-menu-item").click();
    cy.getBySel("logout-menu-item").click();
    cy.wait("@logout").then((request) => {
      expect(request.response?.statusCode).to.equal(204);
    });

    cy.getBySel("email").type(email);
    cy.getBySel("password").type(password);
    cy.getBySel("sign-in-submit").click();
    cy.wait("@login");
    cy.getBySel("password-error").should("be.visible");

    cy.getBySel("password").type(`{selectAll}${newPassword}`);
    cy.getBySel("sign-in-submit").click();
    cy.wait("@login");
    cy.location("pathname").should("not.include", "/sign-in");
  });

  it("Check validation for password", () => {
    const newPassword = "passw1";
    cy.intercept("PATCH", "api/v1/auth/me").as("profileUpdate");

    cy.visit("/profile/edit");
    cy.getBySel("save-password").click();
    cy.getBySel("oldPassword-error").should("be.visible");
    cy.getBySel("newPassword-error").should("be.visible");
    cy.getBySel("passwordConfirmation-error").should("be.visible");

    cy.getBySel("oldPassword").type("incorrectpassword");
    cy.getBySel("oldPassword-error").should("not.exist");

    cy.getBySel("newPassword").type("passw{enter}");
    cy.getBySel("newPassword-error").should("be.visible");
    cy.getBySel("newPassword").type("1{enter}");
    cy.getBySel("newPassword-error").should("not.exist");

    cy.getBySel("passwordConfirmation").type(newPassword);
    cy.getBySel("passwordConfirmation-error").should("not.exist");
    cy.getBySel("passwordConfirmation").type("{selectAll}different password");
    cy.getBySel("passwordConfirmation-error").should("be.visible");
    cy.getBySel("passwordConfirmation").type(`{selectAll}${newPassword}`);
    cy.getBySel("passwordConfirmation-error").should("not.exist");

    cy.getBySel("save-password").click();
    cy.wait("@profileUpdate").then((request) => {
      expect(request.response?.statusCode).to.equal(422);
      cy.getBySel("oldPassword-error").should("be.visible");
    });

    cy.getBySel("oldPassword").type(`{selectAll}${password}`);
    cy.getBySel("oldPassword-error").should("not.exist");
    cy.getBySel("save-password").click();
    cy.wait("@profileUpdate").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
  });
});
