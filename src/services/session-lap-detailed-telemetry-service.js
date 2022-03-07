import axios from "axios";
import store from "@/store";
import { sessionNames } from "@/helpers/sessionNames";
import CarData from "@/classes/CarData";

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

  const results = {};
  for (const i in data) {
    const result = data[i];
    results[result.driverId] = new CarData(result);
  }

  return results;
}
