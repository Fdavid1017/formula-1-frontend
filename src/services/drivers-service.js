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

// export async function getConstructorDetails(id) {
//   let data = null;
//   await axios({
//     url: `drivers/${id}`,
//     method: "GET",
//   }).then((response) => {
//     data = response.data;
//   });
//
//   return data;
// }
