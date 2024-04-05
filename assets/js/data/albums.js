import { fetchApi } from "../services/fetchApi.js"

const API_ALBUMS = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/albumdata";

// Use async/await to fetch and export the data
async function fetchData() {
  try {
    return await fetchApi(API_ALBUMS);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export const albums = await fetchData();