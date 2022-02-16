import axios from "axios";
import { getUrlParams } from "@/services/url-params-builder";

export async function getNews(limit = null, token = null) {
  let data = null;

  await axios({
    url: `get-tweets${getUrlParams({ limit: limit, token: token })}`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  return data;
}
