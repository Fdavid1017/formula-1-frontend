import axios from "axios";

export async function getDrivers() {
  let data = null;
  await axios({
    url: `drivers-standing`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return data;
}

export async function getDriverDetails(id) {
  let data = null;
  await axios({
    url: `driver/${id}`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return data;
}
