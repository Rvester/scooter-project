const User = require("../src/User");

describe("User class tests", () => {
  test("User should initialize with correct properties", () => {
    const user = new User("John Doe", "password123", 25);

    expect(user.username).toBe("John Doe");
    expect(user.password).toBe("password123");
    expect(user.age).toBe(25);
    expect(user.loggedIn).toBe(false);
  });

  test("User should login with correct password", () => {
    const user = new User("John Doe", "password123", 25);

    user.login("password123");
    expect(user.loggedIn).toBe(true);
  });

  test("User should not login with incorrect password", () => {
    const user = new User("John Doe", "password123", 25);

    expect(() => user.login("wrongPassword")).toThrow("Incorrect password.");
  });

  test("User should logout successfully", () => {
    const user = new User("John Doe", "password123", 25);

    user.login("password123");
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
