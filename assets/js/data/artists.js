import { fetchApi } from "../helpers/fetchApi.js"

const API_ARTIST = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/artistdata";

// Use async/await to fetch and export the data
async function fetchData() {
  try {
    const data = await fetchApi(API_ARTIST);

    // Alternatively, you can return the data from this function
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// If you want to export the data immediately when this module is imported
export const artists = await fetchData();