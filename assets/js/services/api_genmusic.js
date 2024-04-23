// Get Data from Suno API
// Get data from input and send to Suno API
// Get data from Suno API and display it on the page
const data = [
  {
    id: "371eeb51-5b45-4af4-809c-c2c5c1d3ba84",
    title: "Island Sun",
    image_url:
      "https://cdn1.suno.ai/image_371eeb51-5b45-4af4-809c-c2c5c1d3ba84.png",
    lyric:
      "[Verse]\nSippin' on sunshine\nParadise in my eyes\nReggae beats flowin'\nFeelin' so alive\nLaid-back grooves takin' over my soul\nCaribbean vibes\nGonna lose control\n[Verse 2]\nPalm trees swayin'\nOn a sandy shore\nReggae rhythm\nCan't ask for more\nMelodies dance\nLike waves in the sea\nIsland vibes\nSet my spirit free\n[Chorus]\nFeel the Island Sun\nIt's the place to be\nLay back and relax\nFeel the reggae melody\nWith the sand beneath your feet\nAnd the ocean breeze\nLet the music take you\nFar across the seas",
    audio_url: "https://cdn1.suno.ai/371eeb51-5b45-4af4-809c-c2c5c1d3ba84.mp3",
    video_url: "https://cdn1.suno.ai/371eeb51-5b45-4af4-809c-c2c5c1d3ba84.mp4",
    created_at: "2024-04-13T03:28:42.707Z",
    model_name: "chirp-v3",
    status: "complete",
    gpt_description_prompt:
      "A reggae-infused pop song with laid-back grooves and sunny melodies, bringing the feel-good vibes of the Caribbean islands.",
    prompt:
      "[Verse]\nSippin' on sunshine\nParadise in my eyes\nReggae beats flowin'\nFeelin' so alive\nLaid-back grooves takin' over my soul\nCaribbean vibes\nGonna lose control\n\n[Verse 2]\nPalm trees swayin'\nOn a sandy shore\nReggae rhythm\nCan't ask for more\nMelodies dance\nLike waves in the sea\nIsland vibes\nSet my spirit free\n\n[Chorus]\nFeel the Island Sun\nIt's the place to be\nLay back and relax\nFeel the reggae melody\nWith the sand beneath your feet\nAnd the ocean breeze\nLet the music take you\nFar across the seas",
    type: "gen",
    tags: "sunny melodies reggae-infused pop laid-back grooves",
  },
  {
    id: "164611ca-4589-4736-83a7-138e00cdbd72",
    title: "Island Sun",
    image_url:
      "https://cdn1.suno.ai/image_164611ca-4589-4736-83a7-138e00cdbd72.png",
    lyric:
      "[Verse]\nSippin' on sunshine\nParadise in my eyes\nReggae beats flowin'\nFeelin' so alive\nLaid-back grooves takin' over my soul\nCaribbean vibes\nGonna lose control\n[Verse 2]\nPalm trees swayin'\nOn a sandy shore\nReggae rhythm\nCan't ask for more\nMelodies dance\nLike waves in the sea\nIsland vibes\nSet my spirit free\n[Chorus]\nFeel the Island Sun\nIt's the place to be\nLay back and relax\nFeel the reggae melody\nWith the sand beneath your feet\nAnd the ocean breeze\nLet the music take you\nFar across the seas",
    audio_url: "https://cdn1.suno.ai/164611ca-4589-4736-83a7-138e00cdbd72.mp3",
    video_url: "https://cdn1.suno.ai/164611ca-4589-4736-83a7-138e00cdbd72.mp4",
    created_at: "2024-04-13T03:28:42.707Z",
    model_name: "chirp-v3",
    status: "complete",
    gpt_description_prompt:
      "A reggae-infused pop song with laid-back grooves and sunny melodies, bringing the feel-good vibes of the Caribbean islands.",
    prompt:
      "[Verse]\nSippin' on sunshine\nParadise in my eyes\nReggae beats flowin'\nFeelin' so alive\nLaid-back grooves takin' over my soul\nCaribbean vibes\nGonna lose control\n\n[Verse 2]\nPalm trees swayin'\nOn a sandy shore\nReggae rhythm\nCan't ask for more\nMelodies dance\nLike waves in the sea\nIsland vibes\nSet my spirit free\n\n[Chorus]\nFeel the Island Sun\nIt's the place to be\nLay back and relax\nFeel the reggae melody\nWith the sand beneath your feet\nAnd the ocean breeze\nLet the music take you\nFar across the seas",
    type: "gen",
    tags: "sunny melodies reggae-infused pop laid-back grooves",
  },
];

// const audio = document.querySelectorAll("audio");
const input = document.querySelector(".inner-genmusic input");
const btnGenMusic = document.querySelector(".inner-genmusic button");
console.log(btnGenMusic);
console.log(input);

input.addEventListener("input", function () {
  console.log(input.value);
});

// console.log(audio);

// Replace your vercel domain
const baseUrl = "https://suno-ai-rho.vercel.app";

async function customGenerateAudio(payload) {
  const url = `${baseUrl}/api/custom_generate`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

async function generateAudioByPrompt(payload) {
  const url = `${baseUrl}/api/generate`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
}

async function getAudioInformation(audioIds) {
  const url = `${baseUrl}/api/get?ids=${audioIds}`;
  const response = await fetch(url);
  return await response.json();
}

async function getQuotaInformation() {
  const url = `${baseUrl}/api/get_limit`;
  const response = await fetch(url);
  return await response.json();
}

// Event listener to log the input value when it changes
input.addEventListener("input", function () {
  console.log(input.value);
});

// Event listener for the button click to generate audio
btnGenMusic.addEventListener("click", async function () {
  try {
    // Display loading state
    // Assuming you have a loading indicator with id="loading"
    const loadingIndicator = document.querySelector(".loader");
    console.log(loadingIndicator);
    loadingIndicator.style.display = "block";
    loadingIndicator.style.transition = "all 0.5s ease-in-out";

    // Call generateAudioByPrompt function with the input value as the prompt
    const audioData = await generateAudioByPrompt({
      prompt: input.value,
      make_instrumental: false,
      wait_audio: false,
    });
    console.log(audioData);

    // Assuming audioData contains the audio URL, update the audio element's source
    if (audioData) {
      // Hide loading state
      loadingIndicator.style.display = "none";
      // Get detailed information about the generated songs
      const ids = `${audioData[0].id}`;

      for (let i = 0; i < 1; i++) {
        const songDetails = await getAudioInformation(ids);
        console.log(songDetails);
        if (songDetails[0].status === "streaming") {
          console.log(`${songDetails[0].id} ==> ${songDetails[0].audio_url}`);
          console.log(`${songDetails[1].id} ==> ${songDetails[1].audio_url}`);
          // Update UI with song details
          updateUI(songDetails);
          break;
        }
      }
    } else {
      console.error("Failed to generate audio");
    }
  } catch (error) {
    console.error("Error generating audio:", error);
  }
});

// Function to update UI with song details
function updateUI(songDetails) {
  console.log("Updating UI with song details", songDetails);
  // Assuming you have two items with class="genMusicItem__info" and two buttons with class="btn-primary"
  const infoElements = document.querySelectorAll(".genMusicItem__info");
  const playButtons = document.querySelectorAll(".btn-primary");

  // Update each item with song details
  for (let i = 0; i < 2; i++) {
    infoElements[i].querySelector(".genMusicItem__img").src = songDetails[i].image_url;
    infoElements[i].querySelector(".genMusicItem__title").textContent =
      songDetails[i].title;
    infoElements[i].querySelector(".genMusicItem__author").textContent =
      songDetails[i].tags;
    playButtons[i].addEventListener("click", function () {
      // Play the audio when the button is clicked
      playAudio(songDetails[i].audio_url);
    });
  }
}

// Function to play audio
function playAudio(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();

}
