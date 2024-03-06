import { songs } from "../data/songs.js";
import { albums } from "../data/albums.js";
import { artists } from "../data/artists.js";

// Helper function to select elements

// render the albums

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Explore Container
const exploreContainer = $(".card-grid-slider");

// Render Trending Containere

// Featured Container
const cardGroupGrids = $$('.card-group-grid');

// Render Trending Container

const trendingContainer = $$("#treding_container .card-group-grid");

const songsCount = songs.length;
let idx_cur_song = 0;

// Popular Artist Container
const popularArtistContainer = $("#popular_artists .card-grid-slider");

// App Object
const app = {
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
    trendingContainer.forEach((trending, index) => {
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
              <figure class="card-playing-horizontal-header">
                <div>
                  <span class="far fa-play" onclick=""></span>
                  <span class="far fa-pause" onclick=""></span>
                </div>
                <a href="playmusic.html"
                  ><img
                    src="${song_1.imagecover}"
                    alt=""
                /></a>
              </figure>
              <div class="card-playing-horizontal-body">
                <h4>
                  <a href="playmusic.html">${song_1.title}</a>
                </h4>
                <p><a href="artist.html">${song_1.artist}</a></p>
              </div>
              <div class="card-playing-horizontal-footer">
                <a
                  id="likeMusicPlay"
                  href="javascript:void(0)"
                  onclick="likeMusicPlay()"
                  title="Like"
                  aria-label="Like"
                  ><span class="far fa-heart"></span
                ></a>
                <a
                  href="javascript:download()"
                  onclick=""
                  title="Download"
                  aria-label="Download"
                  ><span class="far fa-download"></span
                ></a>
              </div>
            </div>
            <div class="card-playing-horizontal">
                <figure class="card-playing-horizontal-header">
                <div>
                  <span class="far fa-play" onclick=""></span>
                </div>
                <a href="playmusic.html"
                  ><img
                    src="${song_2.imagecover}"
                    alt=""
                /></a>
              </figure>
              <div class="card-playing-horizontal-body">
                <h4>
                  <a href="playmusic.html">${song_2.title}</a>
                </h4>
                <p><a href="artist.html">${song_2.artist}</a></p>
              </div>
              <div class="card-playing-horizontal-footer">
                <a
                  id="likeMusicPlay"
                  href="javascript:void(0)"
                  onclick=""
                  title="Like"
                  aria-label="Like"
                  ><span class="far fa-heart"></span
                ></a>
                <a
                  href="javascript:download()"
                  onclick=""
                  title="Download"
                  aria-label="Download"
                  ><span class="far fa-download"></span
                ></a>
              </div>
            </div>
            <div class="card-playing-horizontal">
                <figure class="card-playing-horizontal-header">
                <div>
                  <span class="far fa-play" onclick=""></span>
                </div>
                <a href="playmusic.html"
                  ><img
                    src="${song_3.imagecover}"
                    alt=""
                /></a>
              </figure>
              <div class="card-playing-horizontal-body">
                <h4>
                  <a href="playmusic.html">${song_3.title}</a>
                </h4>
                <p><a href="artist.html">${song_3.artist}</a></p>
              </div>
              <div class="card-playing-horizontal-footer">
                <a
                  id="likeMusicPlay"
                  href="javascript:void(0)"
                  onclick=""
                  title="Like"
                  aria-label="Like"
                  ><span class="far fa-heart"></span
                ></a>
                <a
                  href="javascript:download()"
                  onclick=""
                  title="Download"
                  aria-label="Download"
                  ><span class="far fa-download"></span
                ></a>
              </div>
            </div>
            `;
      trending.innerHTML += html;
    });
  },

  render__four: () => {
    artists.forEach((artist, index) => {
      const html = `
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
      `;
      popularArtistContainer.innerHTML += html;
    });
  },

  // Handle Events
  handle__BtnToggle: () => {
    const sidebar = document.querySelector(".side-bar");
    const toggleBtn = document.querySelector(".toggle-btn");

      let sidebarExpanded = false;

      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");

        if (!sidebarExpanded) {
          document.querySelector(".main").style.width = "calc(100% - 250px)";
          document.querySelector(".main").style.left = "260px";
          sidebarExpanded = true;
        } else {
          document.querySelector(".main").style.width = "calc(100% - 100px)";
          document.querySelector(".main").style.left = "90px";
          sidebarExpanded = false;
        }
      });
  },
  handle__Image__Slider: () => {
    
  },
  start: () => {
    app.handle__BtnToggle();
    app.render__one();
    app.render__two();
    app.render__three();
    app.render__four();
  },
};

app.start();
