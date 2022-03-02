import axios from "axios";
import Constructor from "@/classes/Constructor";

export async function getConstructors() {
  let data = null;
  await axios({
    url: `constructors-standing`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  const constructors = [];

  data.forEach((item) => {
    constructors.push(new Constructor(item));
  });

  return constructors;
}

export async function getConstructorDetails(id) {
  let data = null;
  await axios({
    url: `constructor/${id}`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return new Constructor(data);
}
