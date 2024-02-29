import { fetchApi } from "../helpers/fetchApi.js"

const API_ALBUMS = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/albumdata?fbclid=IwAR2hqFwyTL2KqhaR-Lr76hxpkAt5R6W46RawHDivl_ECisfCSMJGgWhwVWo";

// Use async/await to fetch and export the data
async function fetchData() {
  try {
    const data = await fetchApi(API_ALBUMS);

    // Alternatively, you can return the data from this function
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// If you want to export the data immediately when this module is imported
export const albums = await fetchData();