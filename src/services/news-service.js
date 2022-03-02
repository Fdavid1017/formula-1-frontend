import axios from "axios";
import { getUrlParams } from "@/services/url-params-builder";
import News from "@/classes/News";

export async function getNews(limit = null, token = null) {
  let data = null;

  await axios({
    url: `get-tweets${getUrlParams({ limit: limit, token: token })}`,
    method: "GET",
  }).then((response) => {
    data = response.data;
  });

  const news = [];

  data.data.forEach((item) => {
    news.push(new News(item));
  });

  return {
    data: news,
    meta: data.meta,
  };
}
