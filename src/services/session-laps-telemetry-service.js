import axios from "axios";
import store from "@/store";
import { sessionNames } from "@/helpers/sessionNames";
import convertSessionObjectToSessionResult from "@/helpers/convertSessionObjectToSessionResult";

export async function getSessionLapsTelemetry(gp, session) {
  session = session.toUpperCase();
  if (!sessionNames.includes(session)) {
    throw Error("Invalid session name");
  }

  let data = null;
  await axios({
    url: `all-lap-data/${gp}/${session}/${store.getters.currentSeasonYear}`,
    method: "GET",
  })
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      switch (error.response.status) {
        case 404:
          data = [];
          break;
      }
    });

  if (data.length === 0) {
    return data;
  }

  const results = {};
  for (const i in data) {
    const driverResults = data[i];
    const driverLaps = [];
    let driverId;
    const driverObjectKeys = Object.keys(driverResults.Driver);

    for (const i in driverObjectKeys) {
      const index = driverObjectKeys[i];
      const lapResult = convertSessionObjectToSessionResult(
        driverResults,
        index
      );
      driverLaps.push(lapResult);
      driverId = lapResult.driverId;
    }

    if (driverId) {
      results[driverId] = driverLaps;
    }
  }

  return results;
}
