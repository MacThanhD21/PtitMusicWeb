import { fetchApi } from "../helpers/fetchApi.js"

const API_SONGS = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/getsong?fbclid=IwAR1qb108B1bhulsP2OMSY4ZtbPa75geFt4mpRl464_rgudnvacDRbxYe21I";
  
// Use async/await to fetch and export the data
async function fetchData() {
  try {
    const data = await fetchApi(API_SONGS);

    // Alternatively, you can return the data from this function
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// If you want to export the data immediately when this module is imported
export const songs = await fetchData();