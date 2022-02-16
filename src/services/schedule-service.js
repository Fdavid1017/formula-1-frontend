import axios from "axios";

export async function getCurrentSchedule() {
  let data = null;
  await axios({
    url: `current-schedule`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return data;
}
