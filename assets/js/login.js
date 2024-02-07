function redirectToIndex() {
  // Assuming you set a userLoggedIn indicator in the local storage upon successful login
  localStorage.setItem('userLoggedIn', 'true');
  
  // Redirect to the index.html page
  window.location.href = 'index.html'; // Replace 'index.html' with your actual index page URL
}


const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};