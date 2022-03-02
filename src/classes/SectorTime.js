export default class SectorTime {
  constructor(item) {
    if (!item) {
      this.driverCode = "";
      this.sessionName = "";
      this.time = 0;

      return;
    }

    this.driverCode = item.driver;
    this.sessionName = item.sessionName;
    this.time = item.time;
  }
}
