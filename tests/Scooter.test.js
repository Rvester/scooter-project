const Scooter = require("../src/Scooter");
const User = require("../src/User");

describe("Scooter class tests", () => {
  test("Scooter should initialize with correct properties", () => {
    const scooter = new Scooter("Station A");

    expect(scooter.station).toBe("Station A");
    expect(scooter.user).toBe(null);
    expect(scooter.serial).toBe(1); // Since it's the first created
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
  });

  test("Scooter should be rented successfully if charged and not broken", () => {
    const scooter = new Scooter("Station A");
    const user = new User("johnDoe", "password123", 25);

    scooter.rent(user);

    expect(scooter.station).toBe(null);
    expect(scooter.user).toBe(user);
  });

  test("Scooter should not be rented if charge is below 20%", () => {
    const scooter = new Scooter("Station A");
    scooter.charge = 10; // Setting low charge
    const user = new User("johnDoe", "password123", 25);

    expect(() => scooter.rent(user)).toThrow("Scooter needs to charge.");
  });

  test("Scooter should dock successfully", () => {
    const scooter = new Scooter("Station A");
    const user = new User("johnDoe", "password123", 25);

    scooter.rent(user);
    scooter.dock("Station B");

    expect(scooter.station).toBe("Station B");
    expect(scooter.user).toBe(null);
  });
});
