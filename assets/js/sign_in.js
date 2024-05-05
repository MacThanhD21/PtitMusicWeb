const $ = document.querySelector.bind(document);

const loginForm = $('#Sign__in');
const signUpForm = $('#Sign__up');
const backBtn = $('.back-btn');

backBtn.addEventListener('click', function () {
  // Redirect to the login page
  signUpForm.classList.remove('active');
	loginForm.classList.add('reactive');
	loginForm.classList.remove('active');
});


// Hàm lấy giá trị của một cookie cụ thể
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

// Lấy giá trị của cookie 'accessToken'
const accessToken = getCookie('accessToken');

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

const passwordIconLock = document.querySelector('.fa-lock');
const passwordIconUnlock = document.querySelector('.fa-unlock');
const iconPassword = document.querySelector('.icon-password');

// show/hide password
iconPassword.addEventListener('click', function () {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordIconLock.style.display = 'none';
    passwordIconUnlock.style.display = 'block';
  } else {
    passwordInput.type = 'password';
    passwordIconLock.style.display = 'block';
    passwordIconUnlock.style.display = 'none';
  }
});