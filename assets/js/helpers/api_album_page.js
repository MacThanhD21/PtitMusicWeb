import { songs } from "../data/songs.js";
import { albums } from "../data/albums.js";
import { Categories } from "../data/category.js";

/*------------------------ Khai Báo Tất Cả các biến cần sử dụng trong Page-------------------- */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "PTITMUSIC_PLAYER";

const player = $(".player");
const dashboard = $(".dashboard");
const cd = $(".cd");
const heading = $(".header h2 span");
const cdThumb = $(".cd-thumb");
const mainColor = $("#mainColor");
// console.log(mainColor);
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

// console.log(currentTime, remainTime);

const relatedMusic = $$("#section__trending .card-group-grid");

let idx_cur_song = 0;
let listDataArray;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

async function getSongById(id) {
  return await songs.find((song) => song._id === id);
}

async function getListData(playlist) {
  let listData = [];
  for (const id of playlist) {
    try {
      const songData = await getSongById(id);
      if (songData) {
        listData.push(songData);
      } else {
        console.log("Failed to fetch song data");
      }
    } catch (error) {
      console.error("Error fetching song data:", error);
    }
  }
  return listData;
}

function handleFetchDataError(errorType) {
  console.error(`Error fetching data: ${errorType}`);
  // Handle error as needed
}

try {
  if (urlParams.has("albumId")) {
    const albumId = urlParams.get("albumId");
    const albumFound = albums.find((album) => album._id === albumId);

    if (albumFound) {
      listDataArray = await getListData(albumFound.tracks);
    } else {
      const randomAlbumIndex = Math.floor(Math.random() * albums.length);
      listDataArray = await getListData(albums[randomAlbumIndex].tracks);
    }
  } else if (urlParams.has("cateId")) {
    const cateId = urlParams.get("cateId");
    const cateFound = Categories.find((cate) => cate._id === cateId);

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

// Search Function
const searchInput = $("#search input");
const searchResult = $(".playlist .song");

let isScrollingDown = false;
let lastScrollTop = 0;
let debounceTimer;

function averageColor(imageElement) {
  console.log("Hello");
  // Create the canavs element
  var canvas = document.createElement("canvas"),
    // Get the 2D context of the canvas
    context = canvas.getContext && canvas.getContext("2d"),
    imgData,
    width,
    height,
    length,
    // Define variables for storing
    // the individual red, blue and
    // green colors
    rgb = { r: 0, g: 0, b: 0 },
    // Define variable for the
    // total number of colors
    count = 0;

  // Set the height and width equal
  // to that of the canvas and the image
  height = canvas.height =
    imageElement.naturalHeight ||
    imageElement.offsetHeight ||
    imageElement.height;
  width = canvas.width =
    imageElement.naturalWidth || imageElement.offsetWidth || imageElement.width;

  // Check if the image has valid dimensions
  if (width === 0 || height === 0) {
    return rgb;
  }

  // Draw the image to the canvas
  context.drawImage(imageElement, 0, 0);

  // Get the data of the image
  imgData = context.getImageData(0, 0, width, height);

  // Get the length of image data object
  length = imgData.data.length;

  for (var i = 0; i < length; i += 4) {
    // Sum all values of red colour
    rgb.r += imgData.data[i];

    // Sum all values of green colour
    rgb.g += imgData.data[i + 1];

    // Sum all values of blue colour
    rgb.b += imgData.data[i + 2];

    // Increment the total number of
    // values of rgb colours
    count++;
  }

  // Find the average of red
  rgb.r = Math.floor(rgb.r / count);

  // Find the average of green
  rgb.g = Math.floor(rgb.g / count);

  // Find the average of blue
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
}
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

    searchInput.addEventListener("input", function (e) {
      // Xóa bỏ setTimeout trước đó nếu có
      clearTimeout(timeoutId);

      // Thiết lập setTimeout mới cho việc search sau 1 giây
      timeoutId = setTimeout(function () {
        const searchString = _this.removeAccents(e.target.value.toLowerCase());
        console.log(searchString);

        const filteredSongs = songs.filter((song) => {
          const normalizedTitle = _this.removeAccents(song.title.toLowerCase());
          const normalizedArtist = _this.removeAccents(
            song.artist.toLowerCase()
          );
          return (
            normalizedTitle.startsWith(searchString) ||
            normalizedArtist.startsWith(searchString)
          );
        });
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
                      <i class="fa-regular fa-heart"></i>
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
    const htmls = this.songs.map((song, index) => {
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
                    <i class="fa-regular fa-heart"></i>
                  </div>
              </div>
              <image id="mainColor" src="${
                song.imagecover
              }" alt="" style="display:none" />
          `;
    });
    playlist.innerHTML = htmls.join("");
  },
  render__two: () => {
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
                  <span class="far fa-play" onclick=""></span>
                  <span class="far fa-pause" onclick=""></span>
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
                  <i class="fa-regular fa-download"></i>
                </div>
              </div>
            </div>

            <div class="card-playing-horizontal">
              <div class="btnHandleMusic">
                <span class="far fa-play" onclick=""></span>
                <span class="far fa-pause" onclick=""></span>
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
                  <i class="fa-regular fa-download"></i>
                </div>
              </div>
            </div>

            <div class="card-playing-horizontal">
              <div class="btnHandleMusic">
                <span class="far fa-play" onclick=""></span>
                <span class="far fa-pause" onclick=""></span>
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
                  <i class="fa-regular fa-download"></i>
                </div>
              </div>
            </div>
            <div class="card-playing-horizontal">
              <div class="btnHandleMusic">
                <span class="far fa-play" onclick=""></span>
                <span class="far fa-pause" onclick=""></span>
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
                  <i class="fa-regular fa-download"></i>
                </div>
              </div>
            </div>
            <div class="card-playing-horizontal">
              <div class="btnHandleMusic">
                <span class="far fa-play" onclick=""></span>
                <span class="far fa-pause" onclick=""></span>
              </div>
              <audio src="${song_5.link}" id="audio"></audio>
              <figure class="card-playing-horizontal-header">
                <img src="${song_5.imagecover}" alt="" />
              </figure>
              <div class="card-playing-horizontal-body">
                <h4>
                  <span>${song_5.title}</span>
                </h4>
                <p>
                  <span>${song_5.artist}</span>
                </p>
              </div>
              <div class="card-playing-horizontal-footer">
                <div class="btnHandleDif likeMusic">
                  <i class="fa-solid fa-heart"></i>
                </div>
                <div class="btnHandleDif downloadMusic">
                  <i class="fa-regular fa-download"></i>
                </div>
              </div>
            </div>
            <div class="card-playing-horizontal">
              <div class="btnHandleMusic">
                <span class="far fa-play" onclick=""></span>
                <span class="far fa-pause" onclick=""></span>
              </div>
              <audio src="${song_6.link}" id="audio"></audio>
              <figure class="card-playing-horizontal-header">
                <img src="${song_6.imagecover}" alt="" />
              </figure>
              <div class="card-playing-horizontal-body">
                <h4>
                  <span>${song_6.title}</span>
                </h4>
                <p>
                  <span>${song_6.artist}</span>
                </p>
              </div>
              <div class="card-playing-horizontal-footer">
                <div class="btnHandleDif likeMusic">
                  <i class="fa-solid fa-heart"></i>
                </div>
                <div class="btnHandleDif downloadMusic">
                  <i class="fa-regular fa-download"></i>
                </div>
              </div>
            </div>
            `;
      relateSection.innerHTML += html;
    });
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
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD, player /
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
      // console.log(viewportWidth);
      if (viewportWidth > 992) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop;

        // cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
        // cd.style.opacity = newCdWidth / cdWidth;
        // cd.style.transition = "all 0.2s ease-in-out";
      }
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        console.log(scrollTop);
        const scrollDirection = scrollTop > lastScrollTop ? "down" : "up";
        let newHeightVH;

        // if (scrollDirection === "down") {
        //   newHeightVH = 30;
        // } else {
        //   newHeightVH = 60;
        // }
        player.style.height = `${newHeightVH}vh`;
        playlist.style.height = `${newHeightVH}vh`;
        dashboard.style.height = `${newHeightVH}vh`;

        player.style.transition = "all 0.2s ease";
        playlist.style.transition = "all 0.2s ease";
        dashboard.style.transition = "all 0.2s ease";
      }, 50); // Adjust debounce delay as needed
      navbar.style.cssText = `background: transparent; backdrop-filter: blur(10px); box-shadow: none;`;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        var playPromise = audio.play();

        // In browsers that don’t yet support this functionality,
        // playPromise won’t be defined.
        if (playPromise !== undefined) {
          playPromise
            .then(function () {
              // Automatic playback started!
              audio.play();
            })
            .catch(function (error) {
              console.log(error);
              // Automatic playback failed.
              // Show a UI element to let the user manually start playback.
            });
        }
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (!isNaN(audio.duration)) {
        // Tính thời gian hiện tại của bài hát
        // Calculate the current time of the song

        // Calculate the current time of the song in minutes and seconds
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);

        // Calculate the remaining time of the song in minutes and seconds
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

        const curTimeHtml = `<span>${curTime}</span>`;
        const remTimeHtml = `<span>${remTime}</span>`;

        // Update the HTML content of the current time element
        currentTime.innerHTML = curTimeHtml;

        // Update the HTML content of the remaining time element
        remainTime.innerHTML = remTimeHtml;
      }

      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render__one();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render__one();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render__one();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
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

      const mainColor = document.getElementById("mainColor");
      if (mainColor) {
        // console.log(mainColor);
        // mainColor.crossOrigin = "anonymous"; // Set crossOrigin attribute to allow loading cross-origin images
        mainColor.src = this.currentSong.imagecover;
        mainColor.crossOrigin = "Anonymous";
        console.log(mainColor);
        var rgb = averageColor(mainColor);
        console.log(rgb);
        $(
          `.side-bar`
        ).style.cssText = `background: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`;
        $(
          `.main`
        ).style.cssText = `background: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`;
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
  // Handle Events
  handle__BtnToggle: () => {
    const sidebar = document.querySelector(".side-bar");
    const toggleBtn1 = document.querySelector(".toggle-btn-1");
    const toggleBtn2 = document.querySelector(".toggle-btn-2");
    const section_music_player = document.querySelector(
      ".section-music-player"
    );
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
  },
  handleMainColor: () => {},
  handlePlayMusic: () => {
    // const trendingSection = $("#treding_container");
    // const btnHandleMusic = $$(".btnHandleMusic");
    const songItems = $$(
      "#section__trending .card-group-grid .card-playing-horizontal"
    );
    const audio = $$(".card-playing-horizontal #audio");
    const playBtn = $$(".btnHandleMusic .fa-play");
    const pauseBtn = $$(".btnHandleMusic .fa-pause");
    const likeBtn = $$(".likeMusic");
    const downloadBtn = $$(".downloadMusic");

    songItems.forEach((song, index) => {
      song.addEventListener("click", (e) => {
        console.log(e.target);
        if (
          !e.target.classList.contains("fa-heart") &&
          !e.target.classList.contains("fa-download")
        ) {
          const audioElement = audio[index];
          const currentPlayingAudio = document.querySelector(".playing audio");

          if (currentPlayingAudio && currentPlayingAudio !== audioElement) {
            currentPlayingAudio.pause();
            currentPlayingAudio.currentTime = 0;
            currentPlayingAudio.parentElement.classList.remove("playing");
            const index = Array.from(audio).indexOf(currentPlayingAudio);
            playBtn[index].style.display = "inline-block";
            pauseBtn[index].style.display = "none";
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
        const audioElement = audio[index];
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
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application

    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Render playlist
    this.render__one();
    this.render__two();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvents();
    this.handle__BtnToggle();
    this.handlePlayMusic();
    this.handleMainColor();
    // Hiển thị trạng thái ban đầu của button repeat & random
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);

    // Search
    this.searchF();
  },
};

app.start();
