export default class CarData {
  constructor(item) {
    if (!item) {
      this.color = "";
      this.driverId = "";
      this.fullName = "";
      this.team = "";
      this.carData = {
        brake: "",
        drs: "",
        rpm: "",
        sessionTime: "",
        speed: "",
        throttle: "",
        gear: "",
        distance: "",
      };
      return;
    }

    this.color = item.color;
    this.driverId = item.driverId;
    this.fullName = item.fullName;
    this.team = item.team;
    this.carData = {
      brake: item.carData.Brake,
      drs: item.carData.DRS,
      rpm: item.carData.RPM,
      sessionTime: item.carData.SessionTime,
      speed: item.carData.Speed,
      throttle: item.carData.Throttle,
      gear: item.carData.nGear,
      distance: item.carData.Distance,
    };
  }
}
