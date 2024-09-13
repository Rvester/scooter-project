const Scooter = require("./Scooter");
const User = require("./User");

class ScooterApp {
  constructor() {
    this.stations = {
      "Station A": [],
      "Station B": [],
      "Station C": [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("User already registered.");
    }
    if (age < 18) {
      throw new Error("User too young to register.");
    }
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log(`User ${username} registered successfully.`);
    return user;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("Username or password is incorrect.");
    }
    user.login(password);
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("No such user is logged in.");
    }
    user.logout();
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("No such station.");
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log(`Created new scooter ${scooter.serial} at ${station}.`);
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("No such station.");
    }
    if (scooter.station === station) {
      throw new Error("Scooter already at station.");
    }
    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log(`Scooter ${scooter.serial} is docked at ${station}.`);
  }

  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error("Scooter already rented.");
    }
    scooter.rent(user);
    for (let station in this.stations) {
      this.stations[station] = this.stations[station].filter(
        (s) => s !== scooter
      );
    }
    console.log(`Scooter ${scooter.serial} is rented to ${user.username}.`);
  }

  print() {
    console.log("Registered Users:", Object.keys(this.registeredUsers));
    console.log("Stations and Scooters:");
    for (const [station, scooters] of Object.entries(this.stations)) {
      console.log(`${station}: ${scooters.length} scooters`);
    }
  }
}

module.exports = ScooterApp;
