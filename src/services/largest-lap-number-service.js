import axios from "axios";
import store from "@/store";
import { sessionNames } from "@/helpers/sessionNames";

export async function largestLapNumberService(gp, session) {
  session = session.toUpperCase();
  if (!sessionNames.includes(session)) {
    throw Error("Invalid session name");
  }

  let data = null;
  await axios({
    url: `max-laps-in-session/${gp}/${session}/${store.getters.currentSeasonYear}`,
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

  return data;
}
