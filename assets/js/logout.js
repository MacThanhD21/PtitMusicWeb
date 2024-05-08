// Lấy phần tử nút logout từ DOM
const logoutButton = document.querySelector('.logoutBtn');

// Lắng nghe sự kiện click trên nút logout
logoutButton.addEventListener('click', function () {
  if (accessToken) {
    // Xóa cookie chứa token
    deleteCookie('accessToken');

    // Chuyển hướng người dùng đến trang đăng nhập
    window.location.href = '/sign_in.html';
  } else {
    // Nếu không có cookie, chuyển hướng người dùng đến trang đăng nhập
    window.location.href = '/sign_in.html';
  }
});

// Hàm xóa cookie
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}