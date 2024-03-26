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


// Hàm lấy giá trị của một cookie cụ thể
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

// Lấy giá trị của cookie 'accessToken'
const accessToken = getCookie('accessToken');
// // Kiểm tra xem accessToken có tồn tại hay không
// if (accessToken) {
//   // Nếu có, chuyển hướng người dùng đến trang chính (index.html)
//   window.location.href = '/index.html';
// } else {
//   // Nếu không, chuyển hướng người dùng đến trang đăng nhập (login.html)
//   window.location.href = '/login.html';
// }

const usernameInput = $('#username');
const passwordInput = $('#password');
console.log(username, password);

// Lắng nghe sự kiện khi người dùng nhập vào ô tên người dùng
usernameInput.addEventListener('input', function (event) {
  console.log(event.target.value);
});

// Lắng nghe sự kiện khi người dùng nhập vào ô mật khẩu
passwordInput.addEventListener('input', function (event) {
  console.log(event.target.value);
});

// Hàm đăng nhập
const login = async (user, password) => {
  try {
    const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/validateauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password }),
    });

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Unable to login');
  }
};
// Lắng nghe sự kiện submit của form đăng nhập
loginForm.addEventListener('submit', async function (event) {
  event.preventDefault(); // Ngăn chặn gửi form mặc định

  const user = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await login(user, password);
    console.log(response);
    if (response && response.result._id) {
      setCookie('allInfores', JSON.stringify(response.result), 1);
      // Lưu token vào cookie
      setCookie('accessToken', response.result._id, 1); // Thời gian sống của cookie là 1 ngày

      // Chuyển hướng người dùng đến trang chính
      window.location.href = '/index.html';
    } else {
      alert('Invalid username or password');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while trying to login');
  }
});

// Hàm thiết lập cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
