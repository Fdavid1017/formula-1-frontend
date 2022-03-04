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

  const results = [];
  for (const dataKey in data) {
    for (const key in Object.keys(data[dataKey].Driver)) {
      results.push(convertSessionObjectToSessionResult(data[dataKey], key));
    }
  }

  return results;
}
