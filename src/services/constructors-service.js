import axios from "axios";

export async function getConstructors() {
  let data = null;
  await axios({
    url: `constructors-standing`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return data;
}

export async function getConstructorDetails(id) {
  let data = null;
  await axios({
    url: `constructor/${id}`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return data;
}
