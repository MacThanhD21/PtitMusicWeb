import { songs } from "../data/specifyDataMusic.js";
import { getAverageColor } from "../helpers/getAverageColor.js";
// console.log(songs);

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const relatedMusic = $$("#section__trending .card-group-grid");

let idx_cur_song = 0;
let songsCount = songs.length;

const render__two = () => {
  // Render Trending Container
  relatedMusic.forEach((relateSection) => {
    let song_1, song_2, song_3, song_4, song_5, song_6;
    if (idx_cur_song < songsCount) {
      song_1 = songs[idx_cur_song];
      song_2 = idx_cur_song + 1 < songsCount ? songs[idx_cur_song + 1] : null;
      song_3 = idx_cur_song + 2 < songsCount ? songs[idx_cur_song + 2] : null;
      song_4 = idx_cur_song + 3 < songsCount ? songs[idx_cur_song + 3] : null;
      song_5 = idx_cur_song + 4 < songsCount ? songs[idx_cur_song + 4] : null;
      song_6 = idx_cur_song + 5 < songsCount ? songs[idx_cur_song + 5] : null;

      if (!song_1 || !song_2 || !song_3 || !song_4 || !song_5 || !song_6) {
        return;
      }
    }
    idx_cur_song += 6;
    const html = `
      <div class="card-playing-horizontal">
        <div class="btnHandleMusic">
          <span class="fa-solid fa-play" onclick=""></span>
          <span class="fa-solid fa-pause" onclick=""></span>
        </div>
        <audio src="${song_1.link}" id="audio"></audio>
        <figure class="card-playing-horizontal-header">
          <img src="${song_1.imagecover}" alt="" />
        </figure>
        <div class="card-playing-horizontal-body">
          <h4>
            <span>${song_1.title}</span>
          </h4>
          <p>
            <span>${song_1.artist}</span>
          </p>
        </div>
        <div class="card-playing-horizontal-footer">
          <div class="btnHandleDif likeMusic">
            <i class="fa-solid fa-heart"></i>
          </div>
          <div class="btnHandleDif downloadMusic">
            <i class="fa-solid fa-download"></i>
          </div>
        </div>
      </div>

      <div class="card-playing-horizontal">
        <div class="btnHandleMusic">
          <span class="fa-solid fa-play" onclick=""></span>
          <span class="fa-solid fa-pause" onclick=""></span>
        </div>
        <audio src="${song_2.link}" id="audio"></audio>
        <figure class="card-playing-horizontal-header">
          <img src="${song_2.imagecover}" alt="" />
        </figure>
        <div class="card-playing-horizontal-body">
          <h4>
            <span>${song_2.title}</span>
          </h4>
          <p>
            <span>${song_2.artist}</span>
          </p>
        </div>
        <div class="card-playing-horizontal-footer">
          <div class="btnHandleDif likeMusic">
            <i class="fa-solid fa-heart"></i>
          </div>
          <div class="btnHandleDif downloadMusic">
            <i class="fa-solid fa-download"></i>
          </div>
        </div>
      </div>

      <div class="card-playing-horizontal">
        <div class="btnHandleMusic">
          <span class="fa-solid fa-play" onclick=""></span>
          <span class="fa-solid fa-pause" onclick=""></span>
        </div>
        <audio src="${song_3.link}" id="audio"></audio>
        <figure class="card-playing-horizontal-header">
          <img src="${song_3.imagecover}" alt="" />
        </figure>
        <div class="card-playing-horizontal-body">
          <h4>
            <span>${song_3.title}</span>
          </h4>
          <p>
            <span>${song_3.artist}</span>
          </p>
        </div>
        <div class="card-playing-horizontal-footer">
          <div class="btnHandleDif likeMusic">
            <i class="fa-solid fa-heart"></i>
          </div>
          <div class="btnHandleDif downloadMusic">
            <i class="fa-solid fa-download"></i>
          </div>
        </div>
      </div>
      <div class="card-playing-horizontal">
        <div class="btnHandleMusic">
          <span class="fa-solid fa-play" onclick=""></span>
          <span class="fa-solid fa-pause" onclick=""></span>
        </div>
        <audio src="${song_4.link}" id="audio"></audio>
        <figure class="card-playing-horizontal-header">
          <img src="${song_4.imagecover}" alt="" />
        </figure>
        <div class="card-playing-horizontal-body">
          <h4>
            <span>${song_4.title}</span>
          </h4>
          <p>
            <span>${song_4.artist}</span>
          </p>
        </div>
        <div class="card-playing-horizontal-footer">
          <div class="btnHandleDif likeMusic">
            <i class="fa-solid fa-heart"></i>
          </div>
          <div class="btnHandleDif downloadMusic">
            <i class="fa-solid fa-download"></i>
          </div>
        </div>
      </div>
    </div>
    `;
    relateSection.innerHTML += html;
  });
};

// proccess Logic chơi nhạc

const handlePlayMusic = () => {
  // const trendingSection = $("#treding_container");
  // const btnHandleMusic = $$(".btnHandleMusic");
  const songItems = $$(
    "#section__trending .card-group-grid .card-playing-horizontal"
  );

  // console.log(songItems);
  const audio = $$(".card-playing-horizontal #audio");
  // console.log(audio);
  // console.log(Array.from(audio));
  const playBtn = $$(".btnHandleMusic .fa-play");
  const pauseBtn = $$(".btnHandleMusic .fa-pause");
  const imageElement = $$(".card-playing-horizontal-header img");
  // console.log(imageElement);
  const likeBtn = $$(".likeMusic");
  const downloadBtn = $$(".downloadMusic");
  let cur_index;
  songItems.forEach((song, index) => {
    song.addEventListener("click", (e) => {
      // console.log(imageElement[index]);
      const clickedSong = e.currentTarget;
      // console.log(clickedSong);
      const otherSongs = Array.from(songItems).filter((item) => item !== clickedSong);
      // console.log(otherSongs);
      otherSongs.forEach((item) => {
        item.style.background = "#000";
      });
      if (
        !e.target.classList.contains("fa-heart") &&
        !e.target.classList.contains("fa-download")
      ) {
        const imgElement = new Image();
        if (imgElement) {
          // console.log(imgElement);
          imgElement.src = imageElement[index].src;
          imgElement.setAttribute("crossOrigin", "anonymous");
          imgElement.onload = function () {
            const { R, G, B } = getAverageColor(imgElement, 4);
            // console.log(R, G, B);
            const color = `rgb(${R}, ${G}, ${B})`;
            song.style.backgroundColor = color;
          };
        }
        const audioElement = audio[index];
        const currentPlayingAudio = document.querySelector(".playing audio");
        cur_index = Array.from(audio).indexOf(currentPlayingAudio);
        // console.log(cur_index);
        if (currentPlayingAudio && currentPlayingAudio !== audioElement) {
          try {
            currentPlayingAudio.pause();
            currentPlayingAudio.currentTime = 0;
            currentPlayingAudio.parentElement.classList.remove("playing");
            const index = Array.from(audio).indexOf(currentPlayingAudio);
            playBtn[index].style.display = "inline-block";
            pauseBtn[index].style.display = "none";
          } catch (err) {
            audioElement.pause();
          }
        }

        song.classList.toggle("playing");

        if (audioElement.paused) {
          audioElement.play();
          playBtn[index].style.display = "none";
          pauseBtn[index].style.display = "inline-block";
        } else {
          audioElement.pause();
          playBtn[index].style.display = "inline-block";
          pauseBtn[index].style.display = "none";
        }
        // HandleEvents
        audioElement.addEventListener("ended", () => {
          song.classList.remove("playing");
          playBtn[index].style.display = "inline-block";
          pauseBtn[index].style.display = "none";
        });
      }
    });
  });

  // Like Music

  likeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });

  // Download Music

  downloadBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Tải xuống tệp MP3
      const currentAudio = audio[index];
      const audioSource = audioElement.src;
      const downloadLink = document.createElement("a");
      // gán đường link
      downloadLink.href = audioSource;
      // xét thuộc tính cho thẻ a
      downloadLink.setAttribute("target", "_blank");
      downloadLink.setAttribute("rel", "noopener noreferrer");
      downloadLink.setAttribute("download", `${songs[index].title}`);
      // thêm vào body
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  });
};
render__two();
handlePlayMusic();
