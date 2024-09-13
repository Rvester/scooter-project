class Scooter {
  static nextSerial = 1;

  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge > 20 && !this.isBroken) {
      this.station = null;
      this.user = user;
      console.log(`Scooter ${this.serial} is rented to ${user.username}.`);
    } else if (this.charge <= 20) {
      throw new Error("Scooter needs to charge.");
    } else if (this.isBroken) {
      throw new Error("Scooter needs repair.");
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
    console.log(`Scooter ${this.serial} is docked at ${station}.`);
  }

  recharge() {
    const interval = setInterval(() => {
      if (this.charge < 100) {
        this.charge += 10;
        console.log(`Scooter ${this.serial} charging: ${this.charge}%`);
      } else {
        clearInterval(interval);
        console.log(`Scooter ${this.serial} is fully charged.`);
      }
    }, 1000);
  }

  requestRepair() {
    console.log(`Repair requested for scooter ${this.serial}.`);
    setTimeout(() => {
      this.isBroken = false;
      console.log(`Repair completed for scooter ${this.serial}.`);
    }, 5000);
  }
}

module.exports = Scooter;
