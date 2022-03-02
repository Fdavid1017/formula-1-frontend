import axios from "axios";
import store from "../store";
import SectorTime from "@/classes/SectorTime";

export async function getFastestSessionsInWeekend(round) {
  let data = null;
  await axios({
    url: `weekend-sector-times/${round}/${store.getters.currentSeasonYear}`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  Object.keys(data).forEach((key) => {
    data[key] = new SectorTime(data[key]);
  });

  return data;
}
