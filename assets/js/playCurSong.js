function playCurrentSong() {
  // Lấy dữ liệu bài hát từ localStorage
  const currentSongString = localStorage.getItem("currentSong");

  // Lấy thời gian hiện tại của bài hát từ localStorage
  const currentTime =
    parseFloat(localStorage.getItem("currentSongTime")) || 0;

  // Kiểm tra xem dữ liệu có tồn tại không
  if (currentSongString) {
    // Lấy phần tử chứa music player từ DOM
    const musicPlayer = document.getElementById("sectionMusicPlayer");

    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
    const currentSong = JSON.parse(currentSongString);
    musicPlayer.style.cssText = `
      background-image: url(${currentSong.imagecover});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `;

    // Tạo HTML cho music player dựa trên thông tin của bài hát
    const html = `
      <div class="containerPlayer">
        <div>
          <span class="far fa-angle-down" id="collapseMusicPlayerBtn" onclick="collapseMusicPlayer()"></span>
          <span class="far fa-angle-up" id="expandMusicPlayerBtn" onclick="collapseMusicPlayer()"></span>
          <div class="item__image">
            <img src="${currentSong.imagecover}" alt="${currentSong.title}" />
          </div>
          </div>
        <div class="item__infor">
          <h4>${currentSong.title}</h4>
          <a href="artist.html?artistId=${currentSong.artist}">${currentSong.artist}</a>
        </div>
        <div class="section-music-player-timeline">
          <audio src="${currentSong.link}" autoplay controls></audio>
        </div>
      </div>
    `;

    musicPlayer.innerHTML = html;

    // Đặt thời gian hiện tại của bài hát trong player
    const audioElement = musicPlayer.querySelector("audio");
    audioElement.addEventListener("ended", (e) => {
      // Đặt thời gian hiện tại của bài hát về 0
      audioElement.currentTime = 0;

      // Phát lại nhạc từ đầu
      audioElement.play();
    });

    audioElement.addEventListener("input", (e) => {
      // Lấy giá trị của thanh tua (vị trí tua hiện tại)
      const seekTime = parseFloat(e.target.value);

      // Đặt thời gian hiện tại của bài hát tương ứng với vị trí tua mới
      audioElement.currentTime = seekTime;
    });
    audioElement.currentTime = currentTime;
    audioElement.autoplay = true;
  } else {
    // Lấy ra bài hát đầu tiên trong danh sách bài hát nếu không có bài hát nào đang phát
    const idxRamdom = Math.floor(Math.random() * songs.length);
    const currentSong = songs[idxRamdom];
    const musicPlayer = document.getElementById("sectionMusicPlayer");
    musicPlayer.style.cssText = `
      background-image: url(${currentSong.imagecover});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `;
    const html = `
    <div class="containerPlayer">
      <div>
        <span class="far fa-angle-down" id="collapseMusicPlayerBtn" onclick="collapseMusicPlayer()"></span>
        <span class="far fa-angle-up" id="expandMusicPlayerBtn" onclick="collapseMusicPlayer()"></span>
        <div class="item__image">
          <img src="${currentSong.imagecover}" alt="${currentSong.title}" />
        </div>
        </div>
      <div class="item__infor">
        <h4>${currentSong.title}</h4>
        <a href="${currentSong.artistLink}">${currentSong.artist}</a>
      </div>
      <div class="section-music-player-timeline">
        <audio src="${currentSong.link}" autoplay controls></audio>
      </div>
    </div>
    `;
    musicPlayer.innerHTML = html;
    const audioElement = musicPlayer.querySelector("audio");
    audioElement.addEventListener("ended", (e) => {
      audioElement.currentTime = 0;
      audioElement.play();
    });
    audioElement.addEventListener("input", (e) => {
      const seekTime = parseFloat(e.target.value);
      audioElement.currentTime = seekTime;
    });
    audioElement.currentTime = currentTime;
    audioElement.autoplay = true;

  }
}
playCurrentSong();