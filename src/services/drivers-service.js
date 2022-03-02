import axios from "axios";
import Driver from "@/classes/Driver";

export async function getDrivers() {
  let data = null;
  await axios({
    url: `drivers-standing`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  const drivers = [];

  data.forEach((item) => {
    drivers.push(new Driver(item));
  });

  return drivers;
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
