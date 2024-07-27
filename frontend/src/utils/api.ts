import { getNameCookie, getTokenCookie } from "./cookies";

const HOST = "http://localhost:5000";

async function queryAPI(
  endpoint: string,
  query_params: Record<string, string>
) {
  const paramsString = new URLSearchParams(query_params).toString();
  const url = `${HOST}/${endpoint}?${paramsString}`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(response.status, response.statusText);
  }
  return response.json();
}

export async function addRating(userMap: string, userRatingCategory: string, userRating: string) {
  return await queryAPI("add-rating", {
    name: getNameCookie() || "nameless tee",
    token: getTokenCookie() || "0",
    map: userMap,
    ratingCategory: userRatingCategory,
    rating: userRating,
  });
}

export async function getUserRatings() {
  let json_response =  await queryAPI("get-ratings", {
    name: getNameCookie() || "nameless tee",
    token: getTokenCookie() || "0",
  })
  const result = json_response.result;
  const data = json_response.data;
  
  if (result == "success") {
    return data;
  } else {
    return data;
  }
}