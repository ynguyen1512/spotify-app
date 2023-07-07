const playlist = document.querySelector(".playlist-songs-wrapper");
const playBtn3 = document.querySelector(".playlist-songs__pause-btn");
const audio = document.querySelector("#audio");
// let isPlaying = true;
let indexSong = 0;

const app = {
  currentIndex: 0,
  isPlaying: true,
  songs: [
    {
      // id: "1",
      name: "Người Như Anh",
      singer: "Mai Tiến Dũng",
      path: "./assets/musics/nguoinhuanh.mp3",
      image: "./assets/images/nguoinhuanh.jpg",
    },
    {
      // id: "2",
      name: "Phản Bội Chính Mình",
      singer: "Quân AP",
      path: "./assets/musics/phanboichinhminh.mp3",
      image: "./assets/images/phanboichinhminh.jpg",
    },
    {
      // id: "3",
      name: "Nếu Em Không Về",
      singer: "Song Luân",
      path: "./assets/musics/neuemkhongve.mp3",
      image: "./assets/images/neuemkhongve.jpg",
    },
    {
      // id: "4",
      name: "Anh Từng Cố Gắng",
      singer: "Nhật Phong",
      path: "./assets/musics/anhtungcogang.mp3",
      image: "./assets/images/anhtungcogang.jpg",
    },
    {
      // id: "5",
      name: "Dẫu Có Lỗi Lầm",
      singer: "Reddy",
      path: "./assets/musics/daucoloilam.mp3",
      image: "./assets/images/daucoloilam.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="playlist-songs ${
              index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
              <div class="playlist-songs-row">
                <article class="playlist-songs-cover">
                  <img
                    src="${song.image}"
                    alt=""
                    class="playlist-songs__img"
                  />
                  <img
                    class="playlist-songs__pause-btn"
                    src="./assets/icons/Pause.svg"
                    alt=""
                  />
                  <p class="playlist-songs__name">${song.name}</p>
                  <p class="playlist-songs-desc">${song.singer}</p>
                </article>
              </div>
            </div>
          `;
    });
    playlist.innerHTML = htmls.join("");
  },
  handleEvents: function () {
    const _this = this;
    playBtn3.onclick = function () {
      console.log("Hello");
    };
  },
  start: function () {
    app.render();
    app.handleEvents();
  },
};

app.start();

// JS index
// displayTimer();
// let timer;

// song.setAttribute("src", `./assets//musics/${musics[indexSong]}`);

// playBtn.addEventListener("click", playPause);
// playBtn2.addEventListener("click", playPause);

function playPause() {
  if (isPlaying) {
    audio.play();
    playBtn.innerHTML = `<i class="fa-solid fa-pause pause-btn"></i>`;
    isPlaying = false;
    // timer = setInterval(displayTimer, 500);
  } else {
    audio.pause();
    playBtn.innerHTML = `<i class="fa-solid fa-play play-btn"></i>`;
    isPlaying = true;
    // clearInterval(timer);
  }
}

app.nextBtn.addEventListener("click", () => {
  changeSong(1);
});

prevBtn.addEventListener("click", () => {
  changeSong(-1);
});

song.addEventListener("ended", handleEndedSong);

function changeSong(direction) {
  if (direction === 1) {
    //next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (direction === -1) {
    //prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  song.setAttribute("src", `./assets//musics/${musics[indexSong]}`);
  playPause();
}

function displayTimer() {
  const { duration, currentTime } = song; //destructing
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

rangeBar.addEventListener("change", handleChangeBar);

function handleChangeBar() {
  song.currentTime = rangeBar.value;
}

function handleEndedSong() {
  changeSong(1);
}
