import axios from "axios";
import store from "@/store";
import SessionResult from "@/classes/SessionResult";

export async function getSessionResults(gp, session) {
  session = session.toUpperCase();
  const sessionNames = ["FP1", "FP2", "FP3", "Q", "R"];

  if (!sessionNames.includes(session)) {
    throw Error("Invalid session name");
  }

  let data = null;
  await axios({
    url: `session-results/${gp}/${session}/${store.getters.currentSeasonYear}`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  const results = [];

  for (const key in Object.keys(data.Driver)) {
    const item = {
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
      LapTimeDelta: data.LapTimeDelta[key],
      DriverFullName: data.DriverFullName[key],
      DriverId: data.DriverId[key],
    };

    results.push(new SessionResult(item));
  }

  return results;
}
