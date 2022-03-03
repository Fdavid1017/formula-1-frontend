import Timing from "@/classes/Timing";
import msToTime from "@/helpers/msToTime";

export default class SessionResult {
  constructor(item) {
    if (!item) {
      this.time = new Timing();
      this.driverNumber = 0;
      this.lapTime = new Timing();
      this.lapNumber = 0;
      this.stint = 0;
      this.sector1Time = new Timing();
      this.sector2Time = new Timing();
      this.sector3Time = new Timing();
      this.sector1SessionTime = new Timing();
      this.sector2SessionTime = new Timing();
      this.sector3SessionTime = new Timing();
      this.speedI1 = 0;
      this.speedI2 = 0;
      this.speedFl = 0;
      this.speedSt = 0;
      this.compound = "";
      this.tyreLife = 0;
      this.freshTyre = true;
      this.lapStartTime = new Timing();
      this.team = "";
      this.driverCode = "";
      this.trackStatus = 1;
      this.lapTimeDelta = 0;

      return;
    }

    this.time = msToTime(item.Time);
    this.driverNumber = parseInt(item.DriverNumber);
    this.lapTime = msToTime(item.LapTime);
    this.lapNumber = item.LapNumber;
    this.stint = item.Stint;
    this.sector1Time = msToTime(item.Sector1Time);
    this.sector2Time = msToTime(item.Sector2Time);
    this.sector3Time = msToTime(item.Sector3Time);
    this.sector1SessionTime = msToTime(item.Sector1SessionTime);
    this.sector2SessionTime = msToTime(item.Sector2SessionTime);
    this.sector3SessionTime = msToTime(item.Sector3SessionTime);
    this.speedI1 = item.SpeedI1;
    this.speedI2 = item.SpeedI2;
    this.speedFl = item.SpeedFl;
    this.speedSt = item.SpeedSt;
    this.compound = item.Compound;
    this.tyreLife = item.TyreLife;
    this.freshTyre = item.FreshTyre;
    this.lapStartTime = msToTime(item.LapStartTime);
    this.team = item.Team;
    this.driverCode = item.Driver;
    this.trackStatus = parseInt(item.TrackStatus);
    this.lapTimeDelta = msToTime(item.LapTimeDelta);
  }
}
