// import { MusicGenData } from "../data/music_gen_data.js";

// Data Musics
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

input.addEventListener("input", function () {
  console.log(input.value);
});

// Replace your vercel domain
const baseUrl = "https://suno-ai-three.vercel.app";
async function customGenerateAudio(payload) {
  const url = `${baseUrl}/api/custom_generate`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function generateAudioByPrompt(payload) {
  const url = `${baseUrl}/api/generate`;
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function getAudioInformation(audioIds) {
  const url = `${baseUrl}/api/get?ids=${audioIds}`;
  const response = await axios.get(url);
  return response.data;
}

async function getQuotaInformation() {
  const url = `${baseUrl}/api/get_limit`;
  const response = await axios.get(url);
  return response.data;
}

async function getMusic() {
  try {
    // Display loading state
    const loadingIndicator = document.querySelector(".loader");
    loadingIndicator.style.display = "block";
    loadingIndicator.style.transition = "all 0.5s ease-in-out";

    // Call generateAudioByPrompt function with the input value as the prompt
    const audioData = await generateAudioByPrompt({
      prompt: input.value,
      make_instrumental: false,
      wait_audio: false,
    });

    // Assuming audioData contains the audio URL, update the audio element's source
    const ids = `${audioData[0].id},${audioData[1].id}`;

    for (let i = 0; i < 60; i++) {
      const data = await getAudioInformation(ids);
      if (data[0].status === "streaming" && data[1].status === "streaming") {
        updateUI(data);
        loadingIndicator.style.display = "none";
        break;
      }
      // sleep 5s
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } catch (error) {
    // Hide loading indicator
    const loadingIndicator = document.querySelector(".loader");
    loadingIndicator.style.display = "none";

    // Check if the error status is 402 (Payment Required)
    if (error.response && error.response.status === 402) {
      // Display message indicating that credits have run out
      alert("Bạn đã dùng hết credits, vui lòng nạp VIP để sử dụng tiếp.");
    } else {
      // Log other errors to the console
      console.error("Error generating audio:", error);
    }
  }
}

// Event listener for the button click to generate audio
btnGenMusic.addEventListener("click", async function () {
  getMusic();
});

// Function to update UI with song details
function updateUI(songDetails) {
  const infoElements = document.querySelectorAll(".item");

  // Update each item with song details
  for (let i = 0; i < 2; i++) {
    infoElements[i].querySelector(".genMusicItem__img img").src =
      songDetails[i].image_url;
    infoElements[i].querySelector(".genMusicItem__title").textContent =
      songDetails[i].title;
    infoElements[i].querySelector(".genMusicItem__author").textContent =
      songDetails[i].tags;
    infoElements[i].querySelector(".genMusicItem__action audio").src =
      songDetails[i].audio_url;
  }
  // Add event listeners to play buttons
  playAudio();
}
// updateUI(data);
// Function to play audio
function playAudio() {
  const songItems = document.querySelectorAll(".item");
  const audio = document.querySelectorAll("audio");
  // console.log(songItems);
  songItems.forEach((song, index) => {
    song.addEventListener("click", (e) => {
      const audioElement = audio[index];
      const currentPlayingAudio = document.querySelector(".playing audio");

      // Pause the currently playing audio if it's not the same as the clicked audio
      if (currentPlayingAudio && currentPlayingAudio !== audioElement) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
        currentPlayingAudio.parentElement.parentElement.classList.remove(
          "playing"
        );
      }

      song.classList.toggle("playing");

      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    });
  });
}
