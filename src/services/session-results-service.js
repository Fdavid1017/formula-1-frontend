import axios from "axios";
import store from "@/store";
import RaceResult from "@/classes/RaceResult";
import { sessionNames } from "@/helpers/sessionNames";
import convertSessionObjectToSessionResult from "@/helpers/convertSessionObjectToSessionResult";

export async function getSessionResults(gp, session) {
  session = session.toUpperCase();
  if (!sessionNames.includes(session)) {
    throw Error("Invalid session name");
  }

  let data = null;
  await axios({
    url: `session-results/${gp}/${session}/${store.getters.currentSeasonYear}`,
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

  for (const key in Object.keys(data.Driver)) {
    results.push(convertSessionObjectToSessionResult(data, key));
  }

  return results;
}

export async function getRaceResult(round) {
  let data = null;
  await axios({
    url: `race-results/${round}/${store.getters.currentSeasonYear}`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  const results = [];

  data.forEach((r) => {
    results.push(new RaceResult(r));
  });

  return results;
}
