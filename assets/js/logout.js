// Kiểm tra xem có cookie chứa token hay không
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

// Lấy giá trị của cookie 'accessToken'
const accessToken = getCookie('accessToken');
console.log(accessToken);

// Nếu không có token, chuyển hướng người dùng đến trang đăng nhập
if (!accessToken) {
  window.location.href = '/login.html';
}

// Lấy phần tử nút logout từ DOM
const logoutButton = document.querySelector('.logoutBtn');

// Lắng nghe sự kiện click trên nút logout
logoutButton.addEventListener('click', function () {
  if (accessToken) {
    // Xóa cookie chứa token
    deleteCookie('accessToken');

    // Chuyển hướng người dùng đến trang đăng nhập
    window.location.href = '/login.html';
  } else {
    // Nếu không có cookie, chuyển hướng người dùng đến trang đăng nhập
    window.location.href = '/login.html';
  }
});

// Hàm xóa cookie
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}