import { fetchApi } from "../helpers/fetchApi.js"

const API_ALBUMS = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/albumdata";

// Use async/await to fetch and export the data
async function fetchData() {
  try {
    const data = await fetchApi(API_ALBUMS);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export const albums = await fetchData();