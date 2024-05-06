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
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
}

//Get information of user from cookies
const userCookieValue = JSON.parse(getCookie("user"));

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

// console.log(imageField, usernameField, emailField, passwordField);

if (userCookieValue) {
  imageField.src = userCookieValue.profilePictureUrl;
  usernameField.value = userCookieValue.username;
  emailField.value = userCookieValue.email;
  passwordField.value = userCookieValue.password;
} else {
  console.log("Không tìm thấy cookie");
}

// update information of user
// Xử lý sự kiện khi người dùng bấm nút "Lưu thay đổi"
const saveChangesButton = document.getElementById("save__changes");
saveChangesButton.addEventListener("click", function () {
  // Thu thập thông tin mới từ các trường dữ liệu trên giao diện
  const newImageData = imageField.src; // Giả sử imageField là một thẻ <img>
  const newUsername = usernameField.value;
  const newEmail = emailField.value;
  const newPassword = passwordField.value;

  // Gửi yêu cầu cập nhật thông tin đến máy chủ thông qua AJAX
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/updateUserInfo", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        // Cập nhật giao diện sau khi cập nhật thông tin người dùng thành công
        imageField.src = response.imageData; // Cập nhật hình ảnh
        usernameField.value = response.username; // Cập nhật tên người dùng
        emailField.value = response.email; // Cập nhật email
        passwordField.value = ""; // Xóa mật khẩu khỏi trường nhập
        alert(response.message); // Hiển thị thông báo thành công
      } else {
        console.error("Failed to update user info. Status:", xhr.status);
        alert("Đã xảy ra lỗi khi cập nhật thông tin người dùng.");
      }
    }
  };

  const requestBody = JSON.stringify({
    imageData: newImageData,
    username: newUsername,
    email: newEmail,
    password: newPassword,
  });
  xhr.send(requestBody);
});
