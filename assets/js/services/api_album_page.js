// low performance --- need to be optimized

import { songs } from "../data/songs.js";
import { albums } from "../data/albums.js";
import { Categories } from "../data/category.js";
import { getAverageColor } from "../helpers/getAverageColor.js";

const sidebar = document.querySelector(".side-bar");
const toggleBtn1 = document.querySelector(".toggle-btn-1");
const toggleBtn2 = document.querySelector(".toggle-btn-2");
// const section_music_player = document.querySelector(".section-music-player");
const main = document.querySelector(".main");

let sidebarExpanded = false;

const toggleSidebar = () => {
  sidebar.classList.toggle("active");
  toggleBtn2.classList.toggle("active");

  const newWidth = sidebarExpanded
    ? "calc(100% - 100px)"
    : "calc(100% - 250px)";
  const newLeft = sidebarExpanded ? "90px" : "260px";

  try {
    main.style.width = newWidth;
    main.style.left = newLeft;
  } catch (error) {
    console.error("Error:", error);
  }
  sidebarExpanded = !sidebarExpanded;
};

toggleBtn1.addEventListener("click", toggleSidebar);
toggleBtn2.addEventListener("click", toggleSidebar);
// console.log(songs, albums, Categories);
/************ Khai Báo Tất Cả các biến cần sử dụng trong Page************* */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PlAYER_STORAGE_KEY = "PTITMUSIC_PLAYER";
const player = $(".player");
const dashboard = $(".dashboard");
const cd = $(".cd");
const heading = $(".header h2 span");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const notification = $("#noti");
const navbar = $("#navbarFixed");
const currentTime = $(".currentTime");
const remainTime = $(".remainTime");
// console.log(currentTime, remainTime);
const songsCount = songs.length;
const favoriteSong = $(".favoriteSong");
// Search Function
const searchInput = $("#search input");
// console.log(currentTime, remainTime);
let idx_cur_song = 0;
let listDataArray = [];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const songMap = new Map();
const albumMap = new Map();
const cateMap = new Map();
songs.forEach((song) => {
  songMap.set(song._id, song);
});
albums.forEach((album) => {
  albumMap.set(album._id, album);
});
Categories.forEach((cate) => {
  cateMap.set(cate._id, cate);
});
async function getSongById(id) {
  return await songMap.get(id);
}
async function getAlbumById(id) {
  return await albumMap.get(id);
}
async function getCateById(id) {
  return await cateMap.get(id);
}
async function getListData(playlist) {
  try {
    // Sử dụng Promise.all để thực hiện các cuộc gọi API song song
    const promises = playlist.map((id) => getSongById(id));
    const songDataArray = await Promise.all(promises);
    // Lọc ra các dữ liệu bài hát không null
    const listData = songDataArray.filter((songData) => songData !== null);
    return listData;
  } catch (error) {
    console.error("Error fetching song data:", error);
    return [];
  }
}
function handleFetchDataError(errorType) {
  console.error(`Error fetching data: ${errorType}`);
  // Handle error as needed
}
try {
  if (urlParams.has("albumId")) {
    const albumId = urlParams.get("albumId");
    const albumFound = await getAlbumById(albumId);

    if (albumFound) {
      listDataArray = await getListData(albumFound.tracks);
    } else {
      const randomAlbumIndex = Math.floor(Math.random() * albums.length);
      listDataArray = await getListData(albums[randomAlbumIndex].tracks);
    }
  } else if (urlParams.has("cateId")) {
    const cateId = urlParams.get("cateId");
    const cateFound = await getCateById(cateId);

    if (cateFound) {
      listDataArray = await getListData(cateFound.tracks);
    } else {
      const randomCateIndex = Math.floor(Math.random() * Categories.length);
      listDataArray = await getListData(Categories[randomCateIndex].tracks);
    }
  } else {
    listDataArray = songs;
  }
  // console.log(listDataArray);
} catch (mainError) {
  handleFetchDataError(mainError.message);
}

// Process music playing
const processCurSongPlaying = () => {
  // console.log("Con cụ mày...");
  const audio = $$(".card-playing-horizontal #audio");
  const playBtn = $$(".btnHandleMusic .fa-play");
  const pauseBtn = $$(".btnHandleMusic .fa-pause");

  const currentPlayingAudio = document.querySelector(".card-playing-horizontal.playing audio");
  // console.log(currentPlayingAudio);
  // console.log("-------------------------------");

  if (currentPlayingAudio) {
    try {
      currentPlayingAudio.pause();
      currentPlayingAudio.currentTime = 0;
      currentPlayingAudio.parentElement.classList.remove("playing");
      const index = Array.from(audio).indexOf(currentPlayingAudio);
      if (index !== -1) {
        playBtn[index].style.display = "inline-block";
        pauseBtn[index].style.display = "none";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
// object app
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  songs: listDataArray,
  removeAccents: function (str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  },

  searchF: function () {
    const _this = this;

    let timeoutId;
    let filteredSongs = [];

    searchInput.addEventListener("input", function (e) {
      // Xóa bỏ setTimeout trước đó nếu có
      clearTimeout(timeoutId);

      // Thiết lập setTimeout mới cho việc search sau 1 giây
      timeoutId = setTimeout(function () {
        const searchString = _this.removeAccents(e.target.value.toLowerCase());
        // console.log(searchString);

        if (searchString === "") {
          filteredSongs = listDataArray;
        } else {
          filteredSongs = _this.songs.filter((song) => {
            const normalizedTitle = _this.removeAccents(
              song.title.toLowerCase()
            );
            const normalizedArtist = _this.removeAccents(
              song.artist.toLowerCase()
            );
            return (
              normalizedTitle.startsWith(searchString) ||
              normalizedArtist.startsWith(searchString)
            );
          });
        }
        // console.log(filteredSongs.length);
        if (filteredSongs.length === 0) {
          notification.innerHTML = `
        <h2>No results found for "${e.target.value}"</h2>
        <p>Please make sure your words are spelled correctly, or use fewer or different keywords</p>
      `;
          notification.style.display = "flex";
        } else {
          notification.style.display = "none";

          const htmls = filteredSongs.map((song, index) => {
            return `
                  <div class="song ${
                    index === _this.currentIndex ? "active" : ""
                  }" data-index="${index}">
                    <div class="thumb" style="background-image: url('${
                      song.imagecover ? song.imagecover : ""
                    }')"></div>
                    <div class="body">
                        <h3 class="title">${song.title}</h3>
                        <p class="author">${song.artist}</p>
                    </div>
                    <div class="favoriteSong">
                      <i class="fa-solid fa-heart"></i>
                    </div>
                  </div>
            `;
          });
          playlist.innerHTML = htmls.join("");
        }
        // console.log(filteredSongs);
        app.songs = filteredSongs;

        app.render__one();
        // play music
        const songNodes = document.querySelectorAll(".song");
        songNodes.forEach((songNode) => {
          songNode.onclick = function () {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();

            audio.addEventListener("canplaythrough", function () {
              audio.play();
            });
          };
        });
        songNodes.forEach((songNode) => {
          songNode.classList.remove("active");
        });
      }, 500); // Thiết lập độ trễ là 1000ms (1 giây)
    });
  },
  // (1/2) Uncomment the line below to use localStorage
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},

  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  render__one: function () {
    // console.log("Hello");
    // console.log(this.songs);
    const htmls = this.songs.map((song, index) => {
      if (song != undefined) {
        return `
              <div class="song ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
                  <div class="thumb"
                      style="background-image: url('${
                        song.imagecover ? song.imagecover : ""
                      }')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.title}</h3>
                      <p class="author">${song.artist}</p>
                  </div>
                  <div class="favoriteSong">
                    <i class="fa-solid fa-heart"></i>
                  </div>
              </div>
          `;
      }
    });
    playlist.innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;

    // Define event handlers
    function updateTime() {
      if (!isNaN(audio.duration)) {
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const remainMinutes = Math.floor(
          (audio.duration - audio.currentTime) / 60
        );
        const remainSeconds = Math.floor(
          (audio.duration - audio.currentTime) % 60
        );
        const curTime = `${currentMinutes}:${
          currentSeconds < 10 ? "0" : ""
        }${currentSeconds}`;
        const remTime = `${remainMinutes}:${
          remainSeconds < 10 ? "0" : ""
        }${remainSeconds}`;
        currentTime.innerHTML = `<span>${curTime}</span>`;
        remainTime.innerHTML = `<span>${remTime}</span>`;
      }
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    }

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    function handlePlayPause() {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }

    function handlePlay() {
      processCurSongPlaying();
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    }

    function handlePause() {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    }

    function handleProgressChange(e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    }

    function handleNextSong() {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render__one();
      _this.scrollToActiveSong();
    }

    function handlePrevSong() {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render__one();
      _this.scrollToActiveSong();
    }

    function toggleRandom() {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    }

    function toggleRepeat() {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    }

    function handlePlaylistClick(e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || !e.target.contains(".favoriteSong")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render__one();
          audio.play();
        }

        if (e.target.closest(".favoriteSong")) {
          e.target.classList.toggle("active");
        }
      }
    }
    // Assign event handlers
    audio.ontimeupdate = updateTime;
    playBtn.onclick = handlePlayPause;
    audio.onplay = handlePlay;
    audio.onpause = handlePause;
    progress.oninput = handleProgressChange;
    nextBtn.onclick = handleNextSong;
    prevBtn.onclick = handlePrevSong;
    randomBtn.onclick = toggleRandom;
    repeatBtn.onclick = toggleRepeat;
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    playlist.onclick = handlePlaylistClick;
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 400);
  },
  loadCurrentSong: function () {
    if (this.currentSong) {
      // render information of currentSong
      player.style.cssText = `background: url('${this.currentSong.imagecover}') no-repeat center center; background-size: cover; object-fit: cover;`;
      heading.textContent = this.currentSong.title;
      cdThumb.style.backgroundImage = `url('${this.currentSong.imagecover}')`;
      audio.src = this.currentSong.link;
      // mainColor.src = this.currentSong.imagecover;

      const mainColor = new Image();
      // const mainColor = new Image();
      // console.log(mainColor);

      if (mainColor) {
        // mainColor.crossOrigin = "anonymous"; // Set crossOrigin attribute to allow loading cross-origin images
        mainColor.src = app.currentSong.imagecover; // Blocked by CORS policy
        // console.log(mainColor);
        mainColor.setAttribute("crossOrigin", "anonymous");
        mainColor.onload = function () {
          const { R, G, B } = getAverageColor(mainColor, 4);
          // console.log(R, G, B);
          $(`.side-bar`).style.cssText = `background: rgb(${R}, ${G},${B})`;
          $(`.main`).style.cssText = `background: rgb(${R}, ${G},${B})`;
          $(`#navbarFixed`).style.cssText = `background: rgb(${R}, ${G},${B})`;
        };
      } else {
        console.error("mainColor element not found.");
      }
    } else {
      console.error(
        "Current song is undefined or does not have a title property."
      );
    }
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    this.loadConfig();
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();
    this.render__one();
    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();
    this.handleEvents();
    // Hiển thị trạng thái ban đầu của button repeat & random
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
    // Search Function
    this.searchF();
  },
};
app.start();
