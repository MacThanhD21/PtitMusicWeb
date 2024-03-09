// ## LOADER
// Sau 2 giây, ẩn loader và hiển thị nội dung trang web
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
      const loader = document.querySelector('#Top .container__loader');
      console.log(loader);
      if (loader) {
          loader.style.display = 'none';
      }
  }, 2000);
});

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
      const loader = document.querySelector('.page-02 .container__loader');
      console.log(loader);
      if (loader) {
          loader.style.display = 'none';
      }
  }, 1000);
});


// Login page occurs default

// if (!localStorage.getItem("userLoggedIn")) {
//   window.location.href = "login.html"; // Replace 'login.html' with your actual login page URL
// }

// ## NAVBAR MOBILE
function navbarMobileToggle() {
  document
    .getElementById("navbarMobileToggle")
    .classList.toggle("navbarMobileToggle");
}

// DROPDOWN MENU
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("dropdownMenu");
  const dropdownBtn = document.getElementById("dropdownBtn");

  // Check if the dropdown and dropdown button exist
  if (dropdown && dropdownBtn) {
    // Check if the click is inside the dropdown or the dropdown button
    const isClickInside =
      dropdown.contains(event.target) || dropdownBtn.contains(event.target);

    // Close the dropdown only if clicking outside the dropdown and dropdown button
    if (!isClickInside) {
      dropdown.classList.remove("dropdownMenu");
    }
  }
});


// SWITCH MODE
function toggleClass(elementId, className) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle(className);
  }
}

function switchMode() {
  document.body.classList.toggle("switchMode");

  toggleClass("switchModeBtnDark", "switchModeBtnDarkToggle");
  toggleClass("switchModeBtnLight", "switchModeBtnLightToggle");
  toggleClass("logoFooterModeLight", "logoFooterModeLightToggle");
  toggleClass("logoFooterModeDark", "logoFooterModeDarkToggle");
}

// AVATAR DROPDOWN
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("avatarDropdown");
  const avatar = document.getElementById("avatar");

  // Check if the click is inside the avatar or the dropdown
  const isClickInside =
    avatar.contains(event.target) || dropdown.contains(event.target);

  // Close the dropdown only if clicking outside the avatar and dropdown
  if (!isClickInside) {
    dropdown.classList.remove("avatarDropdown");
  }
});

// Toggle the dropdown when clicking on the avatar
document.getElementById("avatar").addEventListener("click", function (event) {
  const dropdown = document.getElementById("avatarDropdown");
  dropdown.classList.toggle("avatarDropdown");
  event.stopPropagation(); // Prevent the click event from reaching the document level
});

// Prevent the dropdown from closing when clicking inside the dropdown
document
  .getElementById("avatarDropdown")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

// SUPPORT & CHAT MODE
function supportChatMode() {
  document
    .getElementById("supportChatMode")
    .classList.toggle("supportChatMode");
}

// ## BACK TOP
const backTop = document.getElementById("backTop");
const navbarFixed = document.getElementById("navbarFixed");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backTop.classList.add("back-top-active");
  } else if (window.scrollY > 50) {
    navbarFixed.classList.add("nav-fixed-active");
  } else {
    backTop.classList.remove("back-top-active");
    navbarFixed.classList.remove("nav-fixed-active");
  }
});

// ## LIKE MUSIC HEADER
function likeMusicHeader() {
  document
    .getElementById("likeMusicHeader")
    .classList.toggle("likeMusicHeaderToggle");
}
function likeMusicPlay() {
  document
    .querySelector("#likeMusicPlay")
    .classList.toggle("likeMusicPlayToggle");
}

// ## PLAY SOUND/MUSIC PLAYER
var audio1 = new Audio("");
// PLAY SOUND
function playSound(id) {
  console.log(id);
  audio1.src =
    "https://firebasestorage.googleapis.com/v0/b/ptitwebmusicspring24.appspot.com/o/y2mate.is%20-%20Vietsub%20Thanh%20B%C3%ACnh%20Ng%E1%BB%99%20Ho%C3%A0ng%20Thi%20Ph%C3%B9%20%E6%B8%85%E5%B9%B3%E8%AF%AF%20%E9%BB%84%E8%AF%97%E6%89%B6--vGwJat7LZ0-128k-1695022607.mp3?alt=media&token=34d14d2b-291f-44c1-8c54-1f35da09c6df";
  audio1.play();
  // const playBtnPlayCard = document.querySelectorAll("");
  document
    .getElementById("pauseBtnPlayCard")
    .classList.toggle("pauseBtnPlayCardToggle");
  document
    .getElementById("playBtnPlayCard")
    .classList.toggle("playBtnPlayCardToggle");
  // if (audio1.paused) {
  // } else {
  // }
}
// PAUSE SOUND
function pauseSound() {
  audio1.pause();
  document
    .getElementById("pauseBtnPlayCard")
    .classList.toggle("pauseBtnPlayCardToggle");
  document
    .getElementById("playBtnPlayCard")
    .classList.toggle("playBtnPlayCardToggle");
}
function likeMusicPlayer() {
  document
    .getElementById("likeMusicPlayer")
    .classList.toggle("likeMusicPlayerToggle");
}

// COLLAPSE MUSIC PLAYER
function collapseMusicPlayer() {
  document
    .getElementById("sectionMusicPlayer")
    .classList.toggle("sectionMusicPlayerToggle");
  document
    .getElementById("collapseMusicPlayerBtn")
    .classList.toggle("collapseMusicPlayerBtnToggle");
  document
    .getElementById("expandMusicPlayerBtn")
    .classList.toggle("expandMusicPlayerBtnToggle");
}

// FULL PLAYER
function fullPlayer() {
  document.getElementById("fullPlayer").classList.toggle("fullPlayer");
}
function fullPlayerHeaderDropdown() {
  document
    .getElementById("fullPlayerHeaderDropdown")
    .classList.toggle("fullPlayerHeaderDropdown");
}

// ## DOWNLOAD
function download() {
  // Tải xuống tệp MP3
  const downloadLink = document.createElement('a');
  downloadLink.href = '../musics/1.mp3';
  downloadLink.download = '1.mp3'; // Tên tệp khi tải xuống
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  // Hiển thị thông báo hoặc chuyển hướng tới một trang web hướng dẫn
  alert('Your download has started. Please check your downloads folder.');
}

// Run current Song in Main

let currentSong = 0;
let audio = document.querySelector("#audio");
let title = document.querySelector("#title");
let artist = document.querySelector("#artist");
let previous = document.querySelector("#previous");
let play = document.querySelector("#play");
let next = document.querySelector("#next");

let songs = [
  {
    name: "song-1",
    title: "Lạ lùng",
    artist: "Vũ"
  },
  {
    name: "song-2",
    title: "Cô đơn dành cho ai",
    artist: "Lee Ken"
  },
  {
    name: "song-3",
    title: "Em đã thấy anh cùng người ấy",
    artist: "Hoài Lâm"
  },
  {
    name: "song-4",
    title: "Một phút",
    artist: "Andiez"
  },
  {
    name: "song-5",
    title: "Hai phút hơn",
    artist: "Pháo"
  },
  {
    name: "song-6",
    title: "Tháng năm",
    artist: "Soobin Hoàng Sơn"
  }
];

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `../musics/${song.name}.mp3`;
}

function nextSong() {
  currentSong++;
  if (currentSong > songs.length - 1) {
    currentSong = 0;
  }
  loadSong(songs[currentSong]);
  playMusic();
}

function previousSong() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }
  loadSong(songs[currentSong]);
  playMusic();
}

function playMusic() {
  if (audio.paused) {
    audio.play();
    play.classList.replace("fa-play", "fa-pause");
  } else {
    audio.pause();
    play.classList.replace("fa-pause", "fa-play");
  }
}

previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
play.addEventListener("click", playMusic);

// Update progress bar
audio.addEventListener("timeupdate", () => {
  let { currentTime, duration } = audio;
  let progressPercent = (currentTime / duration) * 100;
  let progress = document.querySelector("#progress");
  progress.style.width = `${progressPercent}%`;
});

// Click on progress bar
let progressContainer = document.querySelector("#progress-container");
progressContainer.addEventListener("click", (e) => {
  let progressWidth = progressContainer.clientWidth;
  let clickX = e.offsetX;
  let duration = audio.duration;
  audio.currentTime = (clickX / progressWidth) * duration;
});

// Song ends
audio.addEventListener("ended", nextSong);

