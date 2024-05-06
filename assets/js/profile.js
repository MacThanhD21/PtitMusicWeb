// JavaScript to handle file input change and display preview
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("avatar__display");

imageUpload.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageUrl = e.target.result;
      avatar__display.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%;">`;
    };

    reader.readAsDataURL(file);
  }
});

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

//Get information of user from cookies
const userCookieValue =JSON.parse(getCookie("user"));

if (userCookieValue) {
  // Xử lý giá trị cookie ở đây
  console.log(userCookieValue);
} else {
  console.log("Không tìm thấy cookie");
}

// Set value for input fields

const imageField = document.getElementById("img-account-profile");
const usernameField = document.getElementById("inputUsername");
const emailField = document.getElementById("inputEmailAddress");
const passwordField = document.getElementById("inputPassWord");

console.log(imageField, usernameField, emailField, passwordField);

if (userCookieValue) {
  imageField.src = userCookieValue.profilePictureUrl;
  usernameField.value = userCookieValue.username;
  emailField.value = userCookieValue.email;
  passwordField.value = userCookieValue.password;
} else {
  console.log("Không tìm thấy cookie");
}

