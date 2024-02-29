const $ = document.querySelector.bind(document);

const loginForm = $('#Sign__in');
const signUpForm = $('#Sign__up');
const registerLink = $('.register-link a');
const backBtn = $('.back-btn');

backBtn.addEventListener('click', function () {
  // Redirect to the login page
  signUpForm.classList.remove('active');
	loginForm.classList.add('reactive');
	loginForm.classList.remove('active');
});

registerLink.addEventListener('click', function (event) {
  event.preventDefault();

	loginForm.classList.remove('reactive');
  // Toggle active class between login and sign-up forms
  loginForm.classList.toggle('active');
  signUpForm.classList.toggle('active');
});
