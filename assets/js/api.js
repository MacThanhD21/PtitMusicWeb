// Function to call an API and convert the response to an object
async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Example usage
const apiUrl =
  "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/getsong?fbclid=IwAR1qb108B1bhulsP2OMSY4ZtbPa75geFt4mpRl464_rgudnvacDRbxYe21I";

fetchData(apiUrl).then((data) => {
  if (data) {
    console.log("API response:", data);
    // Now you can use the 'data' object in your code
  } else {
    console.log("Failed to fetch data.");
  }
});
