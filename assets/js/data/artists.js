import { fetchApi } from "../helpers/fetchApi.js"

const API_ARTIST = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/artistdata";

// Use async/await to fetch and export the data
async function fetchData() {
  try {
    const data = await fetchApi(API_ARTIST);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const artists = await fetchData();