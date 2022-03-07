import axios from "axios";
import store from "@/store";
import { sessionNames } from "@/helpers/sessionNames";

export async function sessionLapDetailedTelemetryService(gp, session, lap) {
  session = session.toUpperCase();
  if (!sessionNames.includes(session)) {
    throw Error("Invalid session name");
  }

  let data = null;
  await axios({
    url: `all-car-data/${gp}/${session}/${store.getters.currentSeasonYear}/${lap}`,
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

  // const results = {};
  // for (const i in data) {
  //   const driverResults = data[i];
  //   const driverLaps = [];
  //   let driverId;
  //   const driverObjectKeys = Object.keys(driverResults.Driver);
  //
  //   for (const i in driverObjectKeys) {
  //     const index = driverObjectKeys[i];
  //     const lapResult = convertSessionObjectToSessionResult(
  //       driverResults,
  //       index
  //     );
  //     driverLaps.push(lapResult);
  //     driverId = lapResult.driverId;
  //   }
  //
  //   if (driverId) {
  //     results[driverId] = driverLaps;
  //   }
  // }

  return data;
}
