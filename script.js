const img = document.getElementById("bg_img");
const imgCover = document.getElementById("cover");
const musicTitle = document.getElementById("music_title");
const musicArtist = document.getElementById("music_artist");
const progressBar = document.getElementById("progress_bar");
const progress = document.getElementById("progress");
const currentTimeA = document.getElementById("current_time");
const durationA = document.getElementById("duration");
const shuffleBtn = document.getElementById("shuffle");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const loopBtn = document.getElementById("loop");
const tpass = document.getElementById("password");
const temail = document.getElementById("email");
const login = document.getElementById("logMe");
const register = document.getElementById("regMe");
const logForm = document.querySelector('.login');
const regForm = document.querySelector('.register');
const holder = document.querySelector('.log');
const tHold = document.querySelector('.testing');
const btns = document.querySelector('.Btns');

btns.addEventListener('click', () => {
  if(tpass.value != '' && temail.value != ''){
    logForm.style.display = 'none';
    holder.style.display = 'none';
    loginSucces();
  }else if(temail.value != ''){

  }
})

function loginSucces(){
  if(tpass.value != ''){
      swal("Success", "You have successfully logged in.", "success");
  }
}

const playerImg = document.querySelector('.player_img img');
const songs = [
    {
      path: "Music/Kings & Queens.mp3",
      displayName: "Kings & Queens",
      cover: "https://www.gaytimes.co.uk/wp-content/uploads/2020/03/ava-max-kings-queens-1.png",
      artist: "Ava Max",
    },{
      path: "/Music/The Nights.mp3",
      displayName: "The Nights",
      cover: "https://i.scdn.co/image/ab67616d0000b2730ae4f4d42e4a09f3a29f64ad",
      artist: "Avicii",
    },{
      path: "/Music/Night Changes.mp3",
      displayName: "Night Changes",
      cover: "https://i.scdn.co/image/ab67616d00001e02b4237698c3bfca2e082f1424",
      artist: "One Direction",
    },{
      path: "/Music/Rewrite the Stars.mp3",
      displayName: "Rewrite The Stars",
      cover: "https://i.scdn.co/image/ab67616d0000b273c34ad4b7d0e435e30659ace5",
      artist: "Anne-Marie & James Arthur",
    },{
      path: "/Music/Dandelions.mp3",
      displayName: "Dandelions",
      cover: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da846fb395ab08f025e091af1c07",
      artist: "Ruth B.",
    },{
      path: "/Music/Stereo Hearts.mp3",
      displayName: "Stereo Hearts",
      cover: "https://i.scdn.co/image/ab67616d0000b2730ebe82309ef686b64c755440",
      artist: "Gym Class Heroes",
    },{
      path: "/Music/Counting Stars.mp3",
      displayName: "Counting Stars",
      cover: "https://i.redd.it/nkm6qd5uu9ob1.jpg",
      artist: "OneRepublic",
    },{
      path: "/Music/Sweater Weather.mp3",
      displayName: "Sweater Weather",
      cover: "https://upload.wikimedia.org/wikipedia/en/6/6c/Sweater_Weather_%28The_Neighborhood_single_cover%29.jpg",
      artist: "The Neighbourhood",
    },{
      path: "/Music/7 Years.mp3",
      displayName: "7 Years",
      cover: "https://upload.wikimedia.org/wikipedia/en/b/bc/7-Years-by-Lukas-Graham.jpg",
      artist: "Lukas Graham",
    }
  ];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isLoop = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
    const playlist = document.getElementById("music_list");
    const firstSong = playlist.firstElementChild;
    firstSong.classList.add("current-song");
  }
}

function displayMusicList() {
  const musicList = document.getElementById("music_list");
  musicList.innerHTML = "";

  songs.forEach((song, index) => {
    const listItem = document.createElement("li");
    const img = document.createElement("img");
    img.src = song.cover;
    img.alt = song.displayName;
    img.classList.add("imgMe");
    listItem.appendChild(img);
    const songInfo = document.createElement("span");
    songInfo.classList.add("song-info");
    const songTitle = document.createElement("span");
    songTitle.textContent = song.displayName;
    songTitle.classList.add("song-title");
    songInfo.appendChild(songTitle);
    const songArtist = document.createElement("span");
    songArtist.textContent = song.artist;
    songArtist.classList.add("song-artist");
    songInfo.appendChild(songArtist);
    listItem.appendChild(songInfo);
    listItem.addEventListener("click", () => {
      const listItems = musicList.children;
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove("current-song");
      }
      listItem.classList.add("current-song");
      musicIndex = index;
      loadMusic(songs[musicIndex]);
      playMusic();
    });
    musicList.appendChild(listItem);
  });

  music.addEventListener('ended', () => {
    const listItems = musicList.children;
    if (isShuffle == true){
      musicIndex = Math.floor(Math.random() * listItems.length);
      console.log(musicIndex);
    }

  })

}
  document.addEventListener("DOMContentLoaded", displayMusicList);
  displayMusicList();

function updateCurrentSong() {
  const listItems = document.getElementById("music_list").children;
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].classList.remove("current-song");
  }
  listItems[musicIndex].classList.add("current-song");
}
updateCurrentSong();

function shuffleMusic(){
  isShuffle = !isShuffle;
  if (shuffleBtn.style.color == "rgb(102, 102, 102)") {
    shuffleBtn.style.color = "#000";
  } else {
      shuffleBtn.style.color = "#666";
  }
}
shuffleBtn.style.color = "#666";
shuffleBtn.addEventListener('click', shuffleMusic)

function loopMusic() {
  isLoop = !isLoop;
  if (loopBtn.style.color == "rgb(102, 102, 102)") {
    loopBtn.style.color = "#000";
  } else {
      loopBtn.style.color = "#666";
  }

  if (isLoop == true){
    music.loop = true;
  }else{
    music.loop = false;
  }
}
loopBtn.style.color = "#666";
loopBtn.addEventListener('click', loopMusic)

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("pause", "title");
  music.pause();
}

function loadMusic(songs) {
  music.src = songs.path;
  musicTitle.textContent = songs.displayName;
  musicArtist.textContent = songs.artist;
  imgCover.src = songs.cover;
  img.src = songs.cover;
}

function changeMusic(direction) {

  musicIndex = (musicIndex + direction) % songs.length;

  loadMusic(songs[musicIndex]);
  playMusic();
  updateCurrentSong(); 
}

function setProgressBar(e) {
  const width = progressBar.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progress.style.width = `${ProgressPercent}%`;
  const formattime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationA.textContent = `${formattime(duration / 60)} : ${formattime(duration % 60,)}`;
  currentTimeA.textContent = `${formattime(currentTime / 60)} : ${formattime(currentTime % 60,)}`;
}

const btnEvents = () => {
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", () => changeMusic(1));
  prevBtn.addEventListener("click", () => changeMusic(-1));
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  progressBar.addEventListener("click", setProgressBar);
  document.addEventListener("keydown", function(event) {
    if (event.key == " ") {
        togglePlay();
    }
});
};

document.addEventListener("DOMContentLoaded", btnEvents);

function toggleAnimation() {
    if (music.paused) {
        playerImg.classList.remove('animation');
    } else {
        playerImg.classList.add('animation');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    imgCover.classList.remove('animation');
});
music.addEventListener('play', toggleAnimation);
music.addEventListener('pause', toggleAnimation);

loadMusic(songs[musicIndex]);
function autoPlay() {
  const btnEvents = () => {
    playBtn.addEventListener("click", () => {
      isPlaying = true;
      playBtn.classList.replace("fa-play", "fa-pause");
      playBtn.setAttribute("title", "pause");
      music.play();

      const playlist = document.getElementById("music_list");
      const firstSong = playlist.firstElementChild;
      firstSong.classList.add("current-song");

      playMusic();
    });

  };
}
autoPlay();
