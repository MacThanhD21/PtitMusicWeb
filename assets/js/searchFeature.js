// import { songs } from "./data/songs.js";

// console.log(songs);

// const searchInput = document.getElementById("searchInput");
// const resultSongs = document.querySelector("#search .result-songs");
// const resultAlbums = document.querySelector("#search .result-albums");

// // Lắng nghe sự kiện focus của input
// searchInput.addEventListener("focus", () => {
//   resultSongs.style.display = "block"; // display hộp kết quả
// });
// searchInput.addEventListener("focus", () => {
//   resultAlbums.style.display = "block"; // display hộp kết quả
// });

// // Ẩn hộp kết quả khi click ra ngoài input
// // document.addEventListener("click", (event) => {
// //   if (!searchInput.contains(event.target)) {
// //     resultSongs.style.display = "none";
// //   }
// // });
// // document.addEventListener("click", (event) => {
// //   if (!searchInput.contains(event.target)) {
// //     resultAlbums.style.display = "none";
// //   }
// // });

// // Lắng nghe sự kiện gõ (keypress) hoặc thay đổi nội dung của input
// searchInput.addEventListener("input", () => {
//   // Kiểm tra nếu input có nội dung
//   if (searchInput.value.trim() !== "") {
//     resultSongs.style.display = "block"; // Hiển thị hộp kết quả
//   } else {
//     resultSongs.style.display = "none"; // Ẩn hộp kết quả nếu input rỗng
//   }
// });
// // Lắng nghe sự kiện gõ (keypress) hoặc thay đổi nội dung của input
// searchInput.addEventListener("input", () => {
//   // Kiểm tra nếu input có nội dung
//   if (searchInput.value.trim() !== "") {
//     resultAlbums.style.display = "block"; // Hiển thị hộp kết quả
//   } else {
//     resultAlbums.style.display = "none"; // Ẩn hộp kết quả nếu input rỗng
//   }
// });
