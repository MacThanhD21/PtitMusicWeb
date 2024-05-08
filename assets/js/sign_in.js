const $ = document.querySelector.bind(document);

const signInForm = $("#Sign__in");
const registerLink = $(".register-link a");
const backBtn = $(".back-btn");
console.log(signInForm, registerLink, backBtn);
// Hàm lấy giá trị của một cookie cụ thể
function getCookie(name) {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
}
// Hàm thiết lập cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// Lấy giá trị của cookie 'accessToken'
const accessToken = getCookie("accessToken");
console.log(accessToken);

const usernameInput = $("#username-sign-in");
const passwordInput = $("#password-sign-in");
console.log(usernameInput, passwordInput);

const passwordIconLock = document.querySelector(".fa-lock");
const passwordIconUnlock = document.querySelector(".fa-unlock");
const iconPassword = document.querySelector(".icon-password");

try {
  // show/hide password
  iconPassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordIconLock.style.display = "none";
      passwordIconUnlock.style.display = "block";
    } else {
      passwordInput.type = "password";
      passwordIconLock.style.display = "block";
      passwordIconUnlock.style.display = "none";
    }
  });
  backBtn.addEventListener("click", function () {
    // Redirect to the login page
    signUpForm.classList.remove("active");
    signInForm.classList.add("reactive");
    signInForm.classList.remove("active");
  });

  registerLink.addEventListener("click", function (event) {
    event.preventDefault();

    signInForm.classList.remove("reactive");
    // Toggle active class between login and sign-up forms
    signInForm.classList.toggle("active");
    signUpForm.classList.toggle("active");
  });

  // Lắng nghe sự kiện khi người dùng nhập vào ô tên người dùng
  // usernameInput.addEventListener('input', function (event) {
  //   console.log(event.target.value);
  // });

  // // Lắng nghe sự kiện khi người dùng nhập vào ô mật khẩu
  // passwordInput.addEventListener('input', function (event) {
  //   console.log(event.target.value);
  // });

  // Hàm đăng nhập
  const login = async (user, password) => {
    try {
      const response = await fetch(
        "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/validateauth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, password }),
        }
      );

      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Unable to login");
    }
  };
  // Lắng nghe sự kiện submit của form đăng nhập
  signInForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngăn chặn gửi form mặc định

    const user = usernameInput.value;
    const password = passwordInput.value;

    try {
      const response = await login(user, password);
      // console.log(response);
      if (response && response.result._id) {
        setCookie("user", JSON.stringify(response.result), 1);
        // Lưu token vào cookie
        setCookie("accessToken", response.result._id, 1); // Thời gian sống của cookie là 1 ngày

        // Chuyển hướng người dùng đến trang chính
        window.location.href = "/index.html";
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to login");
    }
  });
} catch (error) {
  console.error("Error:", error);
}
