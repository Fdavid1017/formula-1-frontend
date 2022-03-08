import axios from "axios";
import store from "@/store";

export async function getGearshifts(gp, session, lap, driver) {
  let data = null;
  await axios({
    url: `gear-shifts-on-lap/${lap}/${driver}/${gp}/${session}/${store.getters.currentSeasonYear}`,
    method: "GET",
    headers: {
      "Content-type": "image/jpeg",
    },
  }).then((response) => {
    data = response.data;
  });

  return {
    data: "data:image/png;base64" + data,
    url: `http://127.0.0.1:5000/api/gear-shifts-on-lap/${lap}/${driver}/${gp}/${session}/${store.getters.currentSeasonYear}`,
  };
}
