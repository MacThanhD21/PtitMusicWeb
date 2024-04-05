const jwtToken = "le_476c6cf0_SfD9Z75SK2ujkgvP0p02lowZ"; // Replace YOUR_JWT_TOKEN with your actual JWT token

const options = {
  method: "POST",
  headers: { 
    accept: "application/json",
    "content-type": "application/json",
    "Authorization": `${jwtToken}`
  },
  body: JSON.stringify({
    prompt: "An electronic music soundtrack with a trumpet solo",
    mode: "melody",
    duration: 28,
  }),
};

fetch("https://api.tryleap.ai/api/v1/music", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
