const ScooterApp = require("../src/ScooterApp");
const Scooter = require("../src/Scooter");
const User = require("../src/User");

describe("ScooterApp class tests", () => {
  let app;

  beforeEach(() => {
    app = new ScooterApp();
  });

  test("Register a new user", () => {
    const user = app.registerUser("johnDoe", "password123", 25);

    expect(app.registeredUsers["johnDoe"]).toBe(user);
    expect(user.username).toBe("johnDoe");
  });

  test("Should not register user under 18", () => {
    expect(() => app.registerUser("youngUser", "password123", 17)).toThrow(
      "too young to register."
    );
  });

  test("Should not register user that already exists", () => {
    app.registerUser("johnDoe", "password123", 25);
    expect(() => app.registerUser("johnDoe", "password123", 25)).toThrow(
      "already registered."
    );
  });

  test("Login an existing user", () => {
    app.registerUser("johnDoe", "password123", 25);
    app.loginUser("johnDoe", "password123");

    expect(app.registeredUsers["johnDoe"].loggedIn).toBe(true);
  });

  test("Should not login with incorrect password", () => {
    app.registerUser("johnDoe", "password123", 25);
    expect(() => app.loginUser("johnDoe", "wrongPassword")).toThrow(
      "Username or password is incorrect."
    );
  });

  test("Create a new scooter and add to station", () => {
    const scooter = app.createScooter("Station A");

    expect(app.stations["Station A"]).toContain(scooter);
    expect(scooter.station).toBe("Station A");
  });

  test("Should throw an error if creating scooter at non-existent station", () => {
    expect(() => app.createScooter("Unknown Station")).toThrow(
      "no such station."
    );
  });
});
