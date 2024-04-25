import { songs } from "../data/songs.js";
import { albums } from "../data/albums.js";
import { artists } from "../data/artists.js";
import { Categories } from "../data/category.js";
import { getAverageColor } from "../helpers/getAverageColor.js";

// console.log(songs);

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Explore Container
const exploreContainer = $(".card-grid-slider");
// Render Trending Containere
// Featured Container
const cardGroupGrids = $$(".card-group-grid");
// Render Trending Container
const trendingContainer = $$("#treding_container .card-group-grid");

// Khai báo tất cả các biến liên quan đến việc chơi nhạc ở trang chính

const songsCount = songs.length;
let idx_cur_song = 0;

// Genre Container
const genreContainer = $$("#category .card-grid-slider .card-group-grid");
// Popular Artist Container
const popularArtistContainer = $("#popular_artists .card-grid-slider");
// Current Index
let currentIdxAlbum = 0;
let currentIdxCate = 0;

// App Object
const app = {
  isPlaying: false,
  // Handle Events
  handle__BtnToggle: () => {
    const sidebar = document.querySelector(".side-bar");
    const toggleBtn1 = document.querySelector(".toggle-btn-1");
    const toggleBtn2 = document.querySelector(".toggle-btn-2");

    const main = document.querySelector(".main");

    let sidebarExpanded = false;

    const toggleSidebar = () => {
      sidebar.classList.toggle("active");
      toggleBtn2.classList.toggle("active");

      const newWidth = sidebarExpanded
        ? "calc(100% - 100px)"
        : "calc(100% - 250px)";
      const newLeft = sidebarExpanded ? "90px" : "260px";

      main.style.width = newWidth;
      main.style.left = newLeft;

      sidebarExpanded = !sidebarExpanded;
    };

    toggleBtn1.addEventListener("click", toggleSidebar);
    toggleBtn2.addEventListener("click", toggleSidebar);
  },
  // Render the UI
  render__one: () => {
    // Render the Explore Container
    albums.forEach((album) => {
      const html = `
        <div class="card-simple">
          <a href="album.html?albumId=${album._id}">
            <figure>
              <img
                src="${album.image}"
                alt="${album.name_Album}"
              />
            </figure>
            <h3>${album.name_Album}</h3>
          </a>
          <p><a href="artist.html">${album.name_Album}</a></p>
        </div>
      `;
      exploreContainer.innerHTML += html;
    });
  },

  render__two: () => {
    // Render the featured albums
    // Lặp qua từng thẻ card-group-grid để render dữ liệu từ albums
    cardGroupGrids.forEach((cardGroupGrid, index) => {
      const album_1 = albums[index * 2];
      const album_2 = albums[index * 2 + 1];
      if (
        !album_1 ||
        !album_2 ||
        album_1.image === undefined ||
        album_2.image === undefined
      ) {
        return; // Skip rendering if either album or image property is undefined
      }

      const html = `
        <div class="card-simple">
          <a href="album.html?albumId=${album_1._id}"> 
            <figure>
              <img src="${album_1.image}" alt="${album_1.name_Album}" />
            </figure>
            <h3>${album_1.name_Album}</h3>
          </a>
          <p><a href="artist.html">${album_1.name_Album}</a></p>
        </div>
        <div class="card-simple">
          <a href="album.html?albumId=${album_2._id}"> 
            <figure>
              <img src="${album_2.image}" alt="${album_2.name_Album}" />
            </figure>
            <h3>${album_2.name_Album}</h3>
          </a>
          <p><a href="artist.html">${album_2.name_Album}</a></p>
        </div>
      `;
      cardGroupGrid.innerHTML += html;
    });
  },

  render__three: () => {
    // Render Trending Container
    trendingContainer.forEach((trending) => {
      let song_1, song_2, song_3;
      if (idx_cur_song < songsCount) {
        song_1 = songs[idx_cur_song];
        song_2 = idx_cur_song + 1 < songsCount ? songs[idx_cur_song + 1] : null;
        song_3 = idx_cur_song + 2 < songsCount ? songs[idx_cur_song + 2] : null;

        if (!song_1 || !song_2 || !song_3) {
          return;
        }
      }
      idx_cur_song += 3;
      const html = `
            <div class="card-playing-horizontal">
                <div class="btnHandleMusic">
                  <span class="fa-solid fa-play" onclick=""></span>
                  <span class="fa-solid fa-pause" onclick=""></span>
                </div>
                <audio src="${song_1.link}" id="audio"></audio>
              <figure class="card-playing-horizontal-header">
                <a href="album.html"
                  ><img
                    src="${song_1.imagecover}"
                    alt=""
                /></a>
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
                <a href="album.html"
                  ><img
                    src="${song_2.imagecover}"
                    alt=""
                /></a>
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
                <a href="album.html"
                  ><img
                    src="${song_3.imagecover}"
                    alt=""
                /></a>
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
            `;
      trending.innerHTML += html;
    });
  },

  render__four: () => {
    currentIdxAlbum;

    // Render the Genre Container
    genreContainer.forEach((genre) => {
      // console.log(genre);
      const cate_1 = Categories[currentIdxCate];
      const cate_2 = Categories[currentIdxCate + 1];
      if (!cate_1 || !cate_2) {
        return;
      }

      const html = `
            <a href="album.html?cateId=${cate_1._id}">
              <div class="card-category-vertical card-category-vertical-soft-${currentIdxCate}">
                <h4>${cate_1.Category}</h4>
                <span class="fa-solid fa-play"></span>
              </div>
            </a>
            <a href="album.html?cateId=${cate_2._id}">
              <div class="card-category-vertical card-category-vertical-soft-${
                currentIdxCate + 1
              }">
                <h4>${cate_2.Category}</h4>
                <span class="fa-solid fa-play"></span>
              </div>
            </a>
      `;
      genre.innerHTML = html;
      currentIdxCate += 2;
    });
  },
  render__five: () => {
    artists.forEach((artist) => {
      const html = `
        <div class="items">
          <a href="artist.html?artistId=${artist._id}">
            <div class="card-artists-vertical">
              <figure>
                <img
                  src="${artist.image}"
                  alt="${artist.name_Artist}"
                />
              </figure>
              <h4>${artist.name_Artist}</h4>
            </div>
          </a>
        </div>
      `;
      popularArtistContainer.innerHTML += html;
    });
  },

  handleEvents: function () {
    document.querySelectorAll(".list-item").forEach((item) => {
      item.addEventListener("click", () => {
        // Remove the 'active' class from all items
        document.querySelectorAll(".list-item").forEach((item) => {
          item.classList.remove("active");
        });
        // Add the 'active' class to the clicked item
        item.classList.add("active");
      });
    });

    const trendingSection = $("#treding_container");
    const songItems = $$(
      "#treding_container .card-group-grid .card-playing-horizontal"
    );
    const audio = $$("#audio");
    const playBtn = $$(".btnHandleMusic .fa-play");
    const pauseBtn = $$(".btnHandleMusic .fa-pause");
    const likeBtn = $$(".likeMusic");
    const downloadBtn = $$(".downloadMusic");
    const imageElement = $$(".card-playing-horizontal-header img");

    songItems.forEach((song, index) => {
      song.addEventListener("click", (e) => {
        if (
          !e.target.classList.contains("fa-heart") &&
          !e.target.classList.contains("fa-download")
        ) {
          // console.log(imageElement[index]);
          const clickedSong = e.currentTarget;
          // console.log(clickedSong);
          const otherSongs = Array.from(songItems).filter(
            (item) => item !== clickedSong
          );
          // console.log(otherSongs);
          otherSongs.forEach((item) => {
            item.style.background = "#000";
          });
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

        // Add Event For Song
        audio[index].addEventListener("ended", () => {
          song.classList.remove("playing");
          playBtn[index].style.display = "inline-block";
          pauseBtn[index].style.display = "none";
        });
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

    // trendingSection.addEventListener("click", () => {
    //   musicPlayer.classList.add("active");
    // });

    // musicPlayer.addEventListener("click", () => {
    //   musicPlayer.classList.remove("active");
    // });
  },

  start: () => {
    app.handle__BtnToggle();
    app.render__one();
    app.render__two();
    app.render__three();
    app.render__four();
    app.render__five();
    app.handleEvents();
  },
};

app.start();
