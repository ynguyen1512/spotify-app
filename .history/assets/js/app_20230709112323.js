const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const song = document.getElementById("song-1");
const durationTime = document.querySelector(".player-duration");
const remainingTime = document.querySelector(".player-remaining");
const volume = document.querySelector(".volume-control");
const playBtn = document.querySelector(".pause-button");
const playlistSongs = document.querySelector(".playlist-songs");
const playlistWrapper = document.querySelector(".playlist-song-wrapper");
const playlistCover = document.querySelector(".playlist-songs-cover");
const audio = document.querySelector("#song");
const footerSong = document.querySelector(".footer-player-left-song");
const footer = document.querySelector(".footer-player");
const playlistImg = document.querySelector(".playlist-songs__img");
const range = document.querySelector(".range");
const playlistContent = document.querySelector(".playlist-content-render");
const artistWrapper = document.querySelector(".artist-wrapper");
const artistInfoBtn = document.querySelector(".artist-info-cover");
const songOption = document.querySelector(".song__option");
const volumeIcon = document.querySelector(".volume-icon");
const volumeProgress = document.querySelector("#progress-music");
const sidebarTabs = document.querySelector(".features__item");
const randomBtn =  document.querySelector(".random-btn");
const repeatBtn = document.querySelector(".repeat-btn");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = document.querySelectorAll(".features__item");
const panes = document.querySelectorAll(".tab-pane");
const homeBtn = document.querySelector(".menu__heading");
const right = document.querySelector(".right");
let isPlaying = true;
let indexSong = 0;

const app = {
  currentIndex: 0,
  isMute: false,
  volume: 100,
  isRandom: false,
  isRepeat: false,
  artists: [
    {
      name: "Song Luân",
      path: "./assets/images/songluan.jpeg",
      listener: "71,133",
    },
    {
      name: "Sơn Tùng M-TP",
      path: "./assets/images/sontung.jpg",
      listener: "1,198,648",
    },
  ],
  songs: [
    {
      name: "Người Như Anh",
      singer: "Mai Tiến Dũng",
      path: "./assets/musics/nguoinhuanh.mp3",
      image: "./assets/images/nguoinhuanh.jpg",
    },
    {
      name: "Phản Bội Chính Mình",
      singer: "Quân AP",
      path: "./assets/musics/phanboichinhminh.mp3",
      image: "./assets/images/phanboichinhminh.jpg",
    },
    {
      name: "Nếu Em Không Về",
      singer: "Song Luân",
      path: "./assets/musics/neuemkhongve.mp3",
      image: "./assets/images/neuemkhongve.jpg",
    },
    {
      name: "Anh Từng Cố Gắng",
      singer: "Nhật Phong",
      path: "./assets/musics/anhtungcogang.mp3",
      image: "./assets/images/anhtungcogang.jpg",
    },
    {
      name: "Dẫu Có Lỗi Lầm",
      singer: "Reddy",
      path: "./assets/musics/daucoloilam.mp3",
      image: "./assets/images/daucoloilam.jpg",
    },
    {
      name: "Die For You",
      singer: "The Weekend",
      path: "./assets/musics/dieforyou.mp3",
      image: "./assets/images/dieforyou.jpg",
    },
    {
      name: "Making My Way",
      singer: "Son Tung M-TP",
      path: "./assets/musics/makingmyway.mp3",
      image: "./assets/images/makingmyway.jpg",
    },
    {
      name: "Ánh Sao Và Bầu Trời",
      singer: "TRI",
      path: "./assets/musics/anhsaovabautroi.mp3",
      image: "./assets/images/anhsaovabautroi.jpg",
    },
    {
      name: "Chạm Đáy Nỗi Đau",
      singer: "ERIK",
      path: "./assets/musics/chamdaynoidau.mp3",
      image: "./assets/images/chamdaunoidau.jpg",
    },
    {
      name: "Đau Nhất Là Lặng Im",
      singer: "ERIK",
      path: "./assets/musics/daunhatlalangim.mp3",
      image: "./assets/images/daunhatlalangim.jpg",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong: function () {
    audio.src = this.currentSong.path;
  },
  handleEvents: function () {
    const _this = this;
    let timer;
    playBtn.onclick = function () {
      if (isPlaying) {
        playBtn.innerHTML = '<i class="fa-solid fa-pause play-btn"></i>';
        audio.play();
        isPlaying = false;
      } else {
        playBtn.innerHTML = '<i class="fa-solid fa-play play-btn"></i>';
        audio.pause();
        isPlaying = true;
      }
    };
    playlistWrapper.onclick = function (e) {
      const songNode = e.target.closest(".playlist-songs-cover:not(.active)");
      // trừ bài hát đang đc phát vì nó đang phát nên bấm vào nó không make sense
      //Handle when click the song
      if (songNode || e.target.closest(".song__option")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.renderPlaylistContent();
          _this.renderPlaylist();
          _this.renderSongName();
          playBtn.innerHTML = '<i class="fa-solid fa-pause play-btn"></i>';
          audio.play();
          // if (window.location.pathname === "/playlist.html") {
          //   _this.loadCurrentSong();
          //   _this.renderPlaylistContent();
          //   _this.renderPlaylist();
          //   _this.renderSongName();
          //   playBtn.innerHTML = '<i class="fa-solid fa-pause play-btn"></i>';
          //   audio.play();
          // } else {
          //   _this.loadCurrentSong();
          //   _this.renderPlaylist();
          //   _this.renderSongName();
          //   playBtn.innerHTML = '<i class="fa-solid fa-pause play-btn"></i>';
          //   audio.play();
          // }
        }
      }
    };

    nextBtn.onclick = function () {
      _this.currentIndex++;
      if (_this.currentIndex >= _this.songs.length) {
        _this.currentIndex = 0;
      }
      _this.renderPlaylist();
      _this.renderSongName();
      _this.renderPlaylistContent();
      audio.src = _this.currentSong.path;
      audio.play();
      playBtn.innerHTML = '<i class="fa-solid fa-pause play-btn"></i>';
      if(_this.isRandom){
        _this.playRandomSong()
      }else {
        audio.play();
      }
    };

    prevBtn.onclick = function () {
      _this.currentIndex--;
      if (_this.currentIndex < 0) {
        _this.currentIndex = _this.songs.length - 1;
      }
      _this.renderPlaylist();
      _this.renderSongName();
      _this.renderPlaylistContent();
      audio.src = _this.currentSong.path;
      audio.play();
      playBtn.innerHTML = '<i class="fa-solid fa-pause play-btn"></i>';
      if(_this.isRandom){
        _this.playRandomSong()
      }else {
        audio.play();
      }
    };

    // Random song
    randomBtn.onclick = function() {
      _this.isRandom =!_this.isRandom;
      randomBtn.classList.toggle("gray-filtered", _this.isRandom)
  }
  // Repeat Song
  repeatBtn.onclick = function() {
    _this.isRepeat =!_this.isRepeat;
    repeatBtn.classList.toggle("gray-filtered", _this.isRepeat)
  }

    // when process of song is changed
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        range.value = progressPercent;
      }
    };

    // TAB UI change
    tabs.forEach((tab, index) => {
      const pane = panes[index];
      tab.onclick = function () {
        $(".features__item.active").classList.remove("active");
        $(".tab-pane.active").classList.remove("active");

        // line.style.left = this.offsetLeft + "px";
        // line.style.width = this.offsetWidth + "px";

        this.classList.add("active");
        pane.classList.add("active");
      };
    });

    // BẬT TĂT MUTE Ở VOLUME
    volumeIcon.onclick = function () {
      // volumeIcon.classList.toggle = "fa-solid fa-volume-slash";
      _this.isMute = !_this.isMute;
      // volumeIcon.classList.toggle("music-control__right--active", _this.isMute);
      if (_this.isMute) {
        audio.volume = 0;
        volumeProgress.value = 0;
      } else {
        audio.volume = _this.volume / 100;
        volumeProgress.value = _this.volume;
      }
    };

    // // // TĂNG GIẢM ÂM LƯỢNG
    volumeProgress.onchange = function (e) {
      _this.volume = e.target.value;
      audio.volume = e.target.value / 100;
      if (e.target.value == 0) {
        // volumeIcon.classList.add("music-control__right--active");
        _this.isMute = true;
      } else {
        // volumeIcon.classList.remove("music-control__right--active");
        _this.isMute = false;
      }
    };

    range.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Handle when ended song
    audio.onended = function () {
      if(_this.isRepeat) {
        audio.play()
      }
      else  {
        nextBtn.click()
      }
    }

    // if (window.location.pathname === "/artist.html") {
    //   artistInfoBtn.onclick = function () {
    //     // Render artist info and call the function
    //     _this.renderArtistInfo();
    //     // ...additional code for rendering the view...
    //   };
    // }

    // songOption.onclick = function (e) {
    //   console.log("Hello");
    // };
  },
  playRandomSong: function() {
    let newIndex;
    do{
      newIndex = Math.floor(Math.random() * this.songs.length)
    }
    while(newIndex === this.currentIndex)

    this.currentIndex = newIndex;
    this.loadCurrentSong()
  }
  ,
  showPanel(panelIndex, colorCode) {
    tabButtons.forEach(function (node) {
      node.style.backgroundColor = "";
      node.style.color = "";
    });
    tabButtons[panelIndex].style.backgroundColor = colorCode;
    tabButtons[panelIndex].style.color = "white";
    tabPanel.forEach(function (node) {
      node.style.display = "none";
    });
    tabPanels[panelIndex].style.display = "block";
    tabPanels[panelIndex].style.backgroundColor = colorCode;
  },
  displayTimer: function () {
    const { duration, currentTime } = song; //destructing
    range.max = duration;
    range.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
      durationTime.textContent = "00:00";
    } else {
      durationTime.textContent = formatTimer(duration);
    }
  },
  formatTimer: function (number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  },

  renderIndex: function () {
    return `<div class="playlist-header">
    <div class="playlist-top">
      <div class="playlist-arrows">
        <div class="arrow-container">
          <img src="./assets/icons/LeftArrow.svg" alt="" />
        </div>
        <div class="arrow-container">
          <img src="./assets/icons/RightArrow.svg" alt="" />
        </div>
      </div>

      <div class="playlist-top-email">
        <div class="arrow-container">
          <img src="./assets/icons/Profile.svg" alt="" />
        </div>
`;
  },

  renderPlaylist: function () {
    const playlistSong = this.songs.map((song, index) => {
      return `
            <div class="playlist-songs-cover ${
              index === this.currentIndex ? "active" : ""
            }" data-index="${index}"">
                <ul class="song-info">
                  <li class="song__number">${index + 1}</li>
                  <li class="song__artist-img">
                    <img src="${song.image}" alt="">
                  </li>
                  <li class="song__name">${song.name}</li>
                  <li class="song__listener">1,330,906</li>
                  <li class="song__duration">3:51</li>
                  <li style="margin-left: 36px" class="song__option">•••</li>
                </ul>
                
            </div>
          `;
    });
    playlistWrapper.innerHTML = playlistSong.join("");
  },
  renderPlaylistTable: function () {
    const html = this.songs.map((song, index) => {
      return index === this.currentIndex
        ? `
        <ul class="song-artist-info"  data-index="${index}"">
            <li class="song__number">1</li>
            <li class="song__artist-img">
              <img src="./assets/images/doihanhphuclaycodon.jpg" alt="">
            </li>
            <li class="song__name">Đổi Hạnh Phúc Lấy Cô Đơn</li>
            <li class="song__listener">1,330,906</li>
            <li class="song__duration">3:51</li>
        </ul>
      `
        : "";
    });
    playlistSongContainer.innerHTML = html.join("");
  },
  renderSongName: function () {
    const html = this.songs.map((song, index) => {
      return index === this.currentIndex
        ? `
    <div class="footer-player-left-song-name" style="width: 160px">
    ${song.name}
    </div>
    <div class="footer-player-left-song-artist">${song.singer}</div>
    `
        : "";
    });
    footerSong.innerHTML = html.join("");
  },
  renderPlaylistContent: function () {
    const html = this.songs.map((song, index) => {
      return index === this.currentIndex
        ? `
    <div class="playlist-cover">
    <img src="${song.image}" alt="" />
    </div>
  <div class="playlist-info">
    <div class="playlist-public">${song.singer}</div>
    <div class="playlist-title">${song.name}</div>
    <div class="playlist-description">
      A soundtrack to fuel your good mood while on the road.
    </div>
    <div class="playlist-stats">
      <img
        src="./assets/images/spotify-logo.png"
        alt=""
        width="24px"
        height="24px"
      />
      <span>Spotify ·</span>
      <span>5, 133, 282 Likes ·</span>
      <span>100 songs, </span>
      <span style="font-weight: 200">6 hr 59 min</span>
    </div>
  </div>
    `
        : "";
    });
    playlistContent.innerHTML = html.join("");
  },
  renderArtistInfo: function () {
    const html = this.artists.map((artist, index) => {
      return index === this.currentIndex
        ? `
              <img src="${artist.path}" alt="" class="artist-avt">
              <div class="artist-info" ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
                <div class="artist__verified">
                    <div class="artist__verified-icon">
                        <img src="./assets/icons/checklist.png" alt="">
                    </div>
                    <p>Verified Artist</p>
                </div>
                <div class="artist__name">${artist.name}</div>
                <div class="artist__fan">${artist.listener}</div>
              </div>
        `
        : "";
    });

    artistWrapper.innerHTML = html.join("");
  },

  start: function () {
    this.renderArtistInfo();
    this.renderPlaylistTable();
    this.renderPlaylistContent();
    this.renderSongName();
    this.renderPlaylist();
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    
  },
};

app.start();
