import { fetchApi } from "../helpers/fetchApi.js"

const API_SONGS = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/getsong";
  
// Use async/await to fetch and export the data
async function fetchData() {
  try {
    const data = await fetchApi(API_SONGS);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const songs = await fetchData();