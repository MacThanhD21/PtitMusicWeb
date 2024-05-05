const usernameInputSignUp = document.getElementById("username-Sign-up");
const rePassWordInput = document.getElementById("re-password");
const passwordInputSignUp = document.getElementById("password-Sign-up");

const messages = {
  passwordMismatch: "Mật khẩu không khớp, vui lòng thử lại!",
  signUpSuccess: "Đăng ký thành công",
  usernameExists: "Tên người dùng đã tồn tại",
  invalidCredentials: "Tên người dùng hoặc mật khẩu đã tồn tại hoặc không hợp lệ, vui lòng thử lại!",
  signUpError: "Đã xảy ra lỗi khi đăng ký tài khoản",
};

const signUpForm = document.getElementById("Sign__up");

signUpForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (passwordInputSignUp.value !== rePassWordInput.value) {
    alert(messages.passwordMismatch);
    return;
  }

  const user = usernameInputSignUp.value;
  const email = user + "@gmail.com";
  const password = passwordInputSignUp.value;

  try {
    const response = await signUp(user, email, password);

    if (response.result.body === "Success create new account.") {
      alert(messages.signUpSuccess);
      backBtn.click();
    } else if (response.status === "error") {
      alert(messages.usernameExists);
    } else {
      alert(messages.invalidCredentials);
    }
  } catch (error) {
    console.error("Error:", error);
    alert(messages.signUpError);
  }
});

const signUp = async (username, email, password) => {
  const response = await fetch(
    "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/createaccount",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }
  );

  return response.json();
};
