
// Login page occurs default

// if (!localStorage.getItem("userLoggedIn")) {
//   window.location.href = "login.html"; // Replace 'login.html' with your actual login page URL
// }

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



// SWITCH MODE

function switchMode() {
  document.body.classList.toggle("switchMode");
}


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