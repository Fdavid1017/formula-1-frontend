import axios from "axios";

export async function getCurrentSchedule() {
  // const data = await axios
  //   .get("current-schedule")
  //   .then(function(response) {
  //     // handle success
  //     console.log(response);
  //   })
  //   .catch(function(error) {
  //     // handle error
  //     console.error(error);
  //   });
  //
  // return data;

  let data = null;
  await axios({
    url: `current-schedule`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return data;
}
