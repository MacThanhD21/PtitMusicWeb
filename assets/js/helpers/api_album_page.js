import { songs } from "../data/songs.js";
import { albums } from "../data/albums.js";
import { artists } from "../data/artists.js";

// Hàm Query Song by Id
async function querySongById(songId) {
  // URL của API
  const apiUrl = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/getsongbyid";

  try {
    // Gửi yêu cầu POST đến API với id của bài hát
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: songId })
    });

    // Kiểm tra nếu kết quả trả về không thành công
    if (!response.ok) {
      throw new Error('Failed to fetch song');
    }

    // Parse JSON từ phản hồi
    const songData = await response.json();
    
    // Trả về dữ liệu bài hát
    return songData;
  } catch (error) {
    console.error('Error querying song by id:', error);
    return null; // Trả về null nếu có lỗi
  }
}


// idAlbums khi click vào album sẽ lấy danh sách bài hát của album đó
// Lấy tham số albumId từ URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const albumIdFromMainPage = urlParams.get('albumId');

// Sử dụng albumId và albumName theo nhu cầu của bạn

let albumFinded = albums.find(album => album._id === albumIdFromMainPage);

let playlistMusicAlbumFined = albumFinded.tracks; // laasy ra danh sach id cac bai hat

async function getListData() {
  let listData = [];
  for (const idMusicofTrack of playlistMusicAlbumFined) {
    try {
      const songData = await querySongById(idMusicofTrack);
      if(songData) {
        listData.push(songData);
      }
      else {
        console.log('Failed to fetch song data');
      }
    } catch (error) {
      console.error('Error fetching song data:', error);
    }
  }
  return listData; // Trả về listData khi đã hoàn thành vòng lặp
}


const listDataArray = await getListData(); // Lấy danh sách bài hát từ API


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
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


// Initial Related Music

const relatedMusic = $$("#section__trending .card-group-grid");

// object app
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  handleTitleRun: function(){
    const header = document.querySelector('.header');
    const h2 = document.querySelector('.header h2');
    const span = document.querySelector('.header h2 span');

    console.log(span.offsetWidth);
    console.log(header.offsetWidth);

    if (span.offsetWidth > header.offsetWidth) {
      h2.style.animation = 'marquee 5s linear infinite';
    } else {
      h2.style.animation = 'none';
    }
  },
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},

  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: listDataArray,
  render__one: function () {
    const _this = this;
    const htmls = this.songs.map((song, index) => {
      return `
              <div class="song ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}" onclick=${_this.handleTitleRun()}>
                  <div class="thumb"
                      style="background-image: url('${song.result.imagecover ? song.result.imagecover : ''}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.result.title}</h3>
                      <p class="author">${song.result.artist}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>
          `;
    });
    playlist.innerHTML = htmls.join("");
  },
  render__two: () => {
    relatedMusic.forEach((trending, index) => {
      let song_1, song_2;
      if (index < songs.length) {
        song_1 = songs[index];
        song_2 = index + 1 < songs.length ? songs[index + 1] : null;
        if (!song_1 || !song_2) {
          return;
        }
      }
      const htmls = `
      <div class="card-playing-horizontal">
        <figure class="card-playing-horizontal-header">
          <div>
            <span class="far fa-play" onclick=""></span>
          </div>
          <a href="post.html"
            ><img
              src="${song_1.imagecover}"
              alt=""
          /></a>
        </figure>
        <div class="card-playing-horizontal-body">
          <h4>
            <a href="post.html">
              ${song_1.title}
            </a>
          </h4>
          <p><a href="user.html">${song_1.artist}</a></p>
        </div>
        <div class="card-playing-horizontal-footer">
          <a
            href="javascript:void(0)"
            onclick=""
            title="Like"
            aria-label="Like"
            ><span class="far fa-heart"></span
          ></a>
          <a
            href="javascript:void(0)"
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
          <a href="post.html"
            ><img
              src="${song_2.imagecover}"
              alt=""
          /></a>
        </figure>
        <div class="card-playing-horizontal-body">
          <h4>
            <a href="post.html">
              ${song_2.title}
            </a>
          </h4>
          <p>
            <a href="user.html">
              ${song_2.artist}
            </a>
          </p>
        </div>
        <div class="card-playing-horizontal-footer">
          <a
            href="javascript:void(0)"
            onclick=""
            title="Like"
            aria-label="Like"
            ><span class="far fa-heart"></span
          ></a>
          <a
            href="javascript:void(0)"
            onclick=""
            title="Download"
            aria-label="Download"
            ><span class="far fa-download"></span
          ></a>
        </div>
      </div>
      `;
      trending.innerHTML += htmls;
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
    const cdHeight = cd.offsetHeight;
    
    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      const newCdHeight = cdHeight - scrollTop;

      // cd.style.height = newCdHeight > 0 ? newCdHeight + "%" : 0;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
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
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
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
      _this.render();
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
      _this.render();
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
    }, 300);
  },
  loadCurrentSong: function () {
    if (this.currentSong) {
      heading.textContent = this.currentSong.result.title;
      cdThumb.style.backgroundImage = `url('${this.currentSong.result.imagecover}')`;
      audio.src = this.currentSong.result.link;
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
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Render playlist
    this.render__one();
    this.render__two();

    // Hiển thị trạng thái ban đầu của button repeat & random
    this.handleTitleRun();
    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
