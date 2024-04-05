import { fetchApi } from "../services/fetchApi.js"

const API_CATEGORIES = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/getcategory";

// Use async/await to fetch and export the data
async function fetchData() {
  try {
    return await fetchApi(API_CATEGORIES);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export const Categories = await fetchData();