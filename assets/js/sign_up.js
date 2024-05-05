const $ = document.querySelector.bind(document);
const registerLink = $('.register-link a');

registerLink.addEventListener('click', function (event) {
  event.preventDefault();

	loginForm.classList.remove('reactive');
  // Toggle active class between login and sign-up forms
  loginForm.classList.toggle('active');
  signUpForm.classList.toggle('active');
});


// const signUp = async (username, password) => {
//   const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, password }),
//   });

//   return response.json();
// }

// signUpForm.addEventListener('submit', async function (event) {
//   event.preventDefault();
//   const username = $('#username-signup').value;
//   const password = $('#password-signup').value;

//   const response = await signUp(username, password);
//   console.log(response);

//   if (response.status === 'success') {
//     // Redirect to the login page
//     signUpForm.classList.remove('active');
//     loginForm.classList.add('active');
//   }
// }
// );
