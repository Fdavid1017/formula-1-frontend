export default class SessionDriver {
  constructor(item) {
    if (item === undefined) {
      this.fullName = "";
      this.driverId = "";
      this.permanentNumber = 0;
      this.color = "";
      this.team = "";
      this.code = "";

      return;
    }

    this.fullName = item.fullName;
    this.driverId = item.driverId;
    this.permanentNumber = item.permanentNumber;
    this.color = item.color;
    this.code = item.code;
  }
}
