import SessionResult from "@/classes/SessionResult";

export default function (data, key) {
  return new SessionResult({
    Position: key,
    Time: data.Time[key],
    DriverNumber: data.DriverNumber[key],
    LapTime: data.LapTime[key],
    LapNumber: data.LapNumber[key],
    Stint: data.Stint[key],
    Sector1Time: data.Sector1Time[key],
    Sector2Time: data.Sector2Time[key],
    Sector3Time: data.Sector3Time[key],
    Sector1SessionTime: data.Sector1SessionTime[key],
    Sector2SessionTime: data.Sector2SessionTime[key],
    Sector3SessionTime: data.Sector3SessionTime[key],
    SpeedI1: data.SpeedI1[key],
    SpeedI2: data.SpeedI2[key],
    SpeedFL: data.SpeedFL[key],
    SpeedST: data.SpeedST[key],
    Compound: data.Compound[key],
    TyreLife: data.TyreLife[key],
    FreshTyre: data.FreshTyre[key],
    LapStartTime: data.LapStartTime[key],
    Team: data.Team[key],
    Driver: data.Driver[key],
    TrackStatus: data.TrackStatus[key],
    LapTimeDelta: data.LapTimeDelta ? data.LapTimeDelta[key] : null,
    DriverFullName: data.DriverFullName[key],
    DriverId: data.DriverId[key],
    Color: data.Color[key],
  });
}
