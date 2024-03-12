/// <reference types="cypress" />

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789qwertyuiopasdfghjklzxcvbnm", 10);
const adminUser = Cypress.env("admin");

let email: string;
let password: string;
let firstName: string;
let lastName: string;
let userId: string;

describe("New user creation", () => {
  beforeEach(() => {
    email = `test${nanoid()}@example.com`;
    password = nanoid();
    firstName = `FirstName${nanoid()}`;
    lastName = `LastName${nanoid()}`;

    cy.intercept("GET", "api/v1/users?*").as("usersList");
    cy.intercept("POST", "/api/v1/users").as("userCreated");

    cy.visit("/sign-up");
    cy.login({
      email: adminUser.email,
      password: adminUser.password,
    });
  });

  it("should create a new user", () => {
    cy.getBySel("users-list").should("be.visible");
    cy.wait(3000);
    cy.getBySel("users-list").click();
    cy.wait("@usersList").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.get("table").should("be.visible");
    cy.log("Users list is loaded and displayed");

    cy.getBySel("create-user").click();
    cy.location("pathname").should("include", "/admin-panel/users/create");
    cy.getBySel("new-user-email").type(email);
    cy.getBySel("new-user-password").type(password);
    cy.getBySel("new-user-password-confirmation").type(password);
    cy.getBySel("first-name").type(firstName);
    cy.getBySel("last-name").type(lastName);
    cy.getBySel("role").children("div").should("contain.text", "User");
    cy.getBySel("save-user").click();
    cy.wait("@userCreated").then((request) => {
      expect(request.response?.statusCode).to.equal(201);
    });
    cy.log("New user is created");
    cy.logout();
    cy.login({ email, password });
    cy.getBySel("users-list").should("not.exist");
    cy.log("New user can login in the system");
  });

  it("should create a new admin user", () => {
    cy.visit("/admin-panel/users/create");
    cy.getBySel("new-user-email").type(email);
    cy.getBySel("new-user-password").type(password);
    cy.getBySel("new-user-password-confirmation").type(password);
    cy.getBySel("first-name").type(firstName);
    cy.getBySel("last-name").type(lastName);
    cy.getBySel("role").children("div").should("contain.text", "User");
    cy.getBySel("role").click();
    cy.getBySel("1").click();
    cy.getBySel("role").children("div").should("contain.text", "Admin");
    cy.getBySel("save-user").click();
    cy.wait("@userCreated").then((request) => {
      expect(request.response?.statusCode).to.equal(201);
    });
    cy.log("New user is created");
    cy.logout();
    cy.login({ email, password });
    cy.getBySel("users-list").should("be.visible");
    cy.log("New user can login in the system");
  });

  it("should display validation errors for required fields", () => {
    cy.visit("/admin-panel/users/create");
    cy.getBySel("save-user").click();
    cy.getBySel("first-name-error").should("be.visible");
    cy.getBySel("last-name-error").should("be.visible");
    cy.getBySel("new-user-email-error").should("be.visible");
    cy.getBySel("new-user-password-error").should("be.visible");
    cy.getBySel("new-user-password-confirmation-error").should("be.visible");
    cy.log("Error for required is displayed");

    cy.getBySel("new-user-email").type(email);
    cy.getBySel("new-user-email-error").should("not.exist");
    cy.getBySel("new-user-password").type(password);
    cy.getBySel("new-user-password-error").should("not.exist");
    cy.getBySel("new-user-password-confirmation").type(password);
    cy.getBySel("new-user-password-confirmation-error").should("not.exist");
    cy.getBySel("first-name").type(firstName);
    cy.getBySel("first-name-error").should("not.exist");
    cy.getBySel("last-name").type(lastName);
    cy.getBySel("last-name-error").should("not.exist");
    cy.getBySel("save-user").click();
    cy.wait("@userCreated").then((request) => {
      expect(request.response?.statusCode).to.equal(201);
    });
    cy.log("New user is created");
  });

  it("should validate users password", () => {
    const newPassword = "passw1";

    cy.visit("/admin-panel/users/create");
    cy.getBySel("new-user-email").type(email);
    cy.getBySel("first-name").type(firstName);
    cy.getBySel("last-name").type(lastName);
    cy.getBySel("role").children("div").should("contain.text", "User");

    cy.getBySel("new-user-password").type("passw{enter}");
    cy.getBySel("new-user-password-error").should("be.visible");
    cy.getBySel("new-user-password").type("1{enter}");
    cy.getBySel("new-user-password-error").should("not.exist");

    cy.getBySel("new-user-password-confirmation").type(newPassword);
    cy.getBySel("new-user-password-confirmation-error").should("not.exist");
    cy.getBySel("new-user-password-confirmation").type(
      "{selectAll}different password"
    );
    cy.getBySel("new-user-password-confirmation-error").should("be.visible");
    cy.getBySel("new-user-password-confirmation").type(
      `{selectAll}${newPassword}`
    );
    cy.getBySel("new-user-password-confirmation-error").should("not.exist");

    cy.getBySel("save-user").click();
    cy.wait("@userCreated").then((request) => {
      expect(request.response?.statusCode).to.equal(201);
    });
    cy.log("New user is created");
  });

  it('should display "want to leave" modal', () => {
    cy.visit("/admin-panel/users/create");
    cy.getBySel("new-user-email").type(email);
    cy.getBySel("cancel-user").click();
    cy.getBySel("want-to-leave-modal").should("be.visible");
    cy.getBySel("stay").click();
    cy.getBySel("want-to-leave-modal").should("not.exist");
    cy.location("pathname").should("include", "/admin-panel/users/create");

    cy.getBySel("home-page").click();
    cy.getBySel("want-to-leave-modal").should("be.visible");
    cy.getBySel("stay").click();
    cy.getBySel("want-to-leave-modal").should("not.exist");
    cy.location("pathname").should("include", "/admin-panel/users/create");

    cy.getBySel("cancel-user").click();
    cy.getBySel("want-to-leave-modal").should("be.visible");
    cy.getBySel("leave").click();
    cy.location("pathname").should("include", "/admin-panel/users");
  });
});

describe("Edit users", () => {
  beforeEach(() => {
    email = `test${nanoid()}@example.com`;
    password = nanoid();
    firstName = `FirstName${nanoid()}`;
    lastName = `LastName${nanoid()}`;

    cy.intercept("GET", "api/v1/users?*").as("usersList");
    cy.intercept("GET", "api/v1/users/*").as("userProfile");
    cy.intercept("PATCH", "/api/v1/users/*").as("profileUpdate");
    cy.intercept("POST", "/api/v1/auth/email/login").as("login1");

    cy.createNewUser({
      email,
      password,
      firstName,
      lastName,
    });
    cy.visit("/sign-in");
    cy.getBySel("email").type(email);
    cy.getBySel("password").type(password);
    cy.getBySel("sign-in-submit").click();
    cy.wait("@login1").then((request) => {
      userId = request.response?.body.user.id;
    });
    cy.logout();

    cy.login({
      email: adminUser.email,
      password: adminUser.password,
    });
  });

  it("should edit a user", () => {
    cy.visit(`/admin-panel/users/edit/${userId}`);
    cy.wait("@userProfile").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.wait(3000);
    cy.get('[data-testid="first-name"] input').should(
      "contain.value",
      firstName
    );
    cy.getBySel("first-name").type(`{selectAll}James`);
    cy.get('[data-testid="first-name"] input').should("contain.value", "James");
    cy.get('[data-testid="last-name"] input').should("contain.value", lastName);
    cy.getBySel("last-name").type(`{selectAll}Bond`);
    cy.get('[data-testid="last-name"] input').should("contain.value", "Bond");
    cy.getBySel("save-profile").click();

    cy.wait("@profileUpdate").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.getBySel("users-list").should("be.visible");
    cy.wait(3000);
    cy.getBySel("users-list").click();
    cy.wait("@usersList").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.get("table").should("be.visible");
    cy.contains(email)
      .parent()
      .within(() => {
        cy.contains("Edit").click({ force: true });
      });
  });

  it("should change user role from user to admin", () => {
    cy.visit(`/admin-panel/users/edit/${userId}`);
    cy.wait("@userProfile").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.wait(3000);
    cy.getBySel("role").children("div").should("contain.text", "User");
    cy.getBySel("role").click();
    cy.getBySel("1").click({ force: true });
    cy.getBySel("role").children("div").should("contain.text", "Admin");
    cy.getBySel("save-profile").click();
    cy.wait("@profileUpdate").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });

    cy.logout();
    cy.login({ email, password });
    cy.getBySel("users-list").should("be.visible");
    cy.wait(3000);
    cy.getBySel("users-list").click();
    cy.wait("@usersList").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.get("table").should("be.visible");
    cy.log("User is logged in and can access Users table");
  });

  it("should change users password", () => {
    const newPassword = "passw1";
    cy.visit(`/admin-panel/users/edit/${userId}`);
    cy.wait("@userProfile").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.getBySel("password").type(newPassword);
    cy.getBySel("password-confirmation").type(newPassword);
    cy.getBySel("save-password").click();
    cy.wait("@profileUpdate").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.log("User password is changed");

    cy.logout();
    cy.getBySel("sign-in").click();
    cy.location("pathname").should("include", "/sign-in");
    cy.getBySel("email").type(email);
    cy.getBySel("password").type(password);
    cy.getBySel("sign-in-submit").click();
    cy.wait("@login").then((request) => {
      expect(request.response?.statusCode).to.equal(422);
    });
    cy.getBySel("password-error").should("be.visible");
    cy.log("User cannot login with old password");

    cy.getBySel("password").type(`{selectAll}${newPassword}`);
    cy.getBySel("sign-in-submit").click();
    cy.wait("@login").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.location("pathname").should("not.include", "/sign-in");
  });
});

describe("Edit user role", () => {
  beforeEach(() => {
    email = `test${nanoid()}@example.com`;
    password = nanoid();
    firstName = `FirstName${nanoid()}`;
    lastName = `LastName${nanoid()}`;

    cy.intercept("GET", "api/v1/users?*").as("usersList");
    cy.intercept("POST", "/api/v1/users").as("userCreated");
    cy.intercept("GET", "api/v1/users/*").as("userProfile");
    cy.intercept("PATCH", "/api/v1/users/*").as("profileUpdate");

    cy.visit("/sign-up");
    cy.login({
      email: adminUser.email,
      password: adminUser.password,
    });
    cy.visit("/admin-panel/users/create");
    cy.getBySel("new-user-email").type(email);
    cy.getBySel("new-user-password").type(password);
    cy.getBySel("new-user-password-confirmation").type(password);
    cy.getBySel("first-name").type(firstName);
    cy.getBySel("last-name").type(lastName);
    cy.getBySel("role").children("div").should("contain.text", "User");
    cy.getBySel("role").click();
    cy.getBySel("1").click({ force: true });
    cy.getBySel("role").children("div").should("contain.text", "Admin");
    cy.getBySel("save-user").click();
    cy.wait("@userCreated").then((request) => {
      expect(request.response?.statusCode).to.equal(201);
      userId = request.response?.body.id;
      cy.log(userId);
    });
    cy.log("New admin user is created");

    cy.logout();
    cy.login({ email, password });
    cy.getBySel("users-list").should("be.visible");
    cy.wait(3000);
    cy.getBySel("users-list").click();
    cy.wait("@usersList").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.get("table").should("be.visible");
    cy.log("User is logged in and have access to users table");

    cy.logout();
  });

  it("should change user role from admin to user", () => {
    cy.login({ email: adminUser.email, password: adminUser.password });
    cy.visit(`/admin-panel/users/edit/${userId}`);
    cy.wait("@userProfile").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.wait(3000);
    cy.getBySel("role").children("div").should("contain.text", "Admin");
    cy.getBySel("role").click();
    cy.getBySel("2").click();
    cy.getBySel("role").children("div").should("contain.text", "User");
    cy.getBySel("save-profile").click();
    cy.wait("@profileUpdate").then((request) => {
      expect(request.response?.statusCode).to.equal(200);
    });
    cy.log("Users role changed from admin to user");

    cy.logout();
    cy.login({ email, password });
    cy.getBySel("users-list").should("not.exist");
    cy.log("User is logged in and doesn't have access to users table");
  });
});
