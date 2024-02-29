// ## LOADER
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loaderWrapper = document.querySelector(".loader-warpper");
    if (loaderWrapper) {
      loaderWrapper.classList.toggle("loader-warpper-hide");
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
    .getElementById("likeMusicPlay")
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
  document.getElementById("download").classList.toggle("downloadToggle");

  setTimeout(() => {
    window.location.href = "../musics/1.mp3";
  }, 3000);
}

// NUMBER ALBUMS
var cardGridLen = document.getElementById("cardGridLen").childElementCount;
var numAlbums = document.getElementById("numAlbums");
numAlbums.innerHTML = cardGridLen;
