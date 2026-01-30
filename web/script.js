// Menu actif
document.querySelectorAll(".nav").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Add Story
document.querySelectorAll(".add-story").forEach(item => {
  item.addEventListener("click", () => {
    alert("Ajouter une story (photo / vidéo / audio)");
  });
});

// Bouton suivre artiste
document.querySelectorAll(".btn.follow").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.innerText = "Suivi";
    btn.style.opacity = "0.6";
  });
});

// Bouton ajouter ami
document.querySelectorAll(".btn.add").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.innerText = "Ajouté";
    btn.style.opacity = "0.6";
  });
});

// Voir tout
document.querySelectorAll(".see-all").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Voir tout – page complète à venir");
  });
});

// ===== AUDIO PLAYER =====
const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

const miniPlayer = document.querySelector(".player");
const miniIcon = miniPlayer.querySelector("i.ph-play-circle, i.ph-pause-circle");

const applePlayer = document.getElementById("apple-player");
const closeApple = document.getElementById("close-apple");
const playApple = document.getElementById("apple-play");
const progress = document.getElementById("apple-progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

let playing = false;

/* OPEN PLAYER */
miniPlayer.addEventListener("click", () => {
  applePlayer.classList.remove("hidden");
});

/* CLOSE PLAYER */
closeApple.addEventListener("click", (e) => {
  e.stopPropagation();
  applePlayer.classList.add("hidden");
});

/* PLAY / PAUSE */
playApple.addEventListener("click", () => {
  if (playing) {
    audio.pause();
    playApple.innerHTML = '<i class="ph-play"></i>';
    if (miniIcon) miniIcon.className = "ph-play-circle";
  } else {
    audio.play();
    playApple.innerHTML = '<i class="ph-pause"></i>';
    if (miniIcon) miniIcon.className = "ph-pause-circle";
  }
  playing = !playing;
});

/* PROGRESS UPDATE */
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* VOLUME */
volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
});

/* FORMAT TIME */
function formatTime(time) {
  if (!time || isNaN(time)) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ===== SHUFFLE & REPEAT =====
let shuffle = false;
let repeat = false;

const shuffleBtn = document.querySelector(".ph-shuffle");
const repeatBtn = document.querySelector(".ph-repeat");

if (shuffleBtn) {
  shuffleBtn.style.opacity = "0.4";
  shuffleBtn.addEventListener("click", () => {
    shuffle = !shuffle;
    shuffleBtn.style.opacity = shuffle ? "1" : "0.4";
  });
}

if (repeatBtn) {
  repeatBtn.style.opacity = "0.4";
  repeatBtn.addEventListener("click", () => {
    repeat = !repeat;
    repeatBtn.style.opacity = repeat ? "1" : "0.4";
  });
}

// ===== LYRICS =====
const lyrics = [
  { time: 0, text: "🎵 Nuit étoilée…" },
  { time: 10, text: "✨ Sous le ciel infini…" },
  { time: 20, text: "🙏 Ta lumière me guide…" },
  { time: 30, text: "💫 Je marche avec foi…" },
  { time: 40, text: "🌟 Dans ta grâce infinie…" }
];

const lyricsEl = document.getElementById("lyrics");

audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;
  // findLast polyfill for older browsers
  let line = null;
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (current >= lyrics[i].time) {
      line = lyrics[i];
      break;
    }
  }
  if (line && lyricsEl) lyricsEl.textContent = line.text;
});

// ===== QUEUE & PLAY NEXT =====
const queue = [
  {
    title: "Nuit étoilée",
    artist: "Jordan Merrick",
    audio: audio.src
  },
  {
    title: "Grâce infinie",
    artist: "Visites",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];

let currentIndex = 0;

function updateIcons(isPlaying) {
  if (isPlaying) {
    playApple.innerHTML = '<i class="ph-pause"></i>';
    if (miniIcon) miniIcon.className = "ph-pause-circle";
  } else {
    playApple.innerHTML = '<i class="ph-play"></i>';
    if (miniIcon) miniIcon.className = "ph-play-circle";
  }
  playing = isPlaying;
}

function playNext() {
  currentIndex = shuffle
    ? Math.floor(Math.random() * queue.length)
    : (currentIndex + 1) % queue.length;

  audio.src = queue[currentIndex].audio;
  audio.play();
  updateIcons(true);
  
  // Update title
  const titleEl = document.getElementById("apple-title");
  const artistEl = document.getElementById("apple-artist");
  if (titleEl) titleEl.textContent = queue[currentIndex].title;
  if (artistEl) artistEl.textContent = queue[currentIndex].artist;
}

audio.addEventListener("ended", () => {
  if (repeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    playNext();
  }
});

// Skip buttons
const skipBack = document.querySelector(".ph-skip-back");
const skipForward = document.querySelector(".ph-skip-forward");

if (skipBack) {
  skipBack.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + queue.length) % queue.length;
    audio.src = queue[currentIndex].audio;
    audio.play();
    updateIcons(true);
  });
}

if (skipForward) {
  skipForward.addEventListener("click", () => {
    playNext();
  });
}

// ===== SWIPE TO CLOSE =====
let startY = 0;

applePlayer.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

applePlayer.addEventListener("touchmove", e => {
  const delta = e.touches[0].clientY - startY;
  if (delta > 100) {
    applePlayer.classList.add("hidden");
  }
});

// ===== EVENT HANDLERS =====
const artistPage = document.getElementById("artist-page");
const homeSections = document.querySelectorAll(".home-section");
const backHome = document.getElementById("back-home");

// Bouton réserver
document.querySelectorAll(".btn.reserve").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Redirection vers la réservation de l'événement");
  });
});

// Top 20 items
document.querySelectorAll(".top20-item").forEach(item => {
  item.addEventListener("click", () => {
    alert("Lecture du titre");
  });
});

// More options
document.querySelectorAll(".more").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    alert("Options du titre");
  });
});

// Back home button
if (backHome) {
  backHome.addEventListener("click", () => {
    showPage("page-home");
  });
}

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  const page = document.getElementById(pageId);
  if (page) page.classList.remove("hidden");
}

// Bottom nav page switching
document.querySelectorAll(".bottom-nav .nav").forEach((nav, index) => {
  nav.addEventListener("click", () => {
    const pages = ["page-home", "page-explore", "page-actu", "page-profile"];
    if (pages[index]) {
      showPage(pages[index]);
    }
  });
});

// ===== HOME TABS =====
document.querySelectorAll(".home-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".home-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// ===== GOMUNE CARD CLOSE =====
const gomuneClose = document.querySelector(".gomune-close");
const gomuneCard = document.querySelector(".gomune-card");

if (gomuneClose && gomuneCard) {
  gomuneClose.addEventListener("click", () => {
    gomuneCard.style.display = "none";
  });
}

// ===== BOOK ORDER =====
document.querySelectorAll(".btn.order").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Commande en cours de traitement...");
  });
});

// ===== ALBUM LISTEN BUTTONS =====
document.querySelectorAll(".album-info button").forEach(btn => {
  btn.addEventListener("click", () => {
    audio.play();
    updateIcons(true);
    applePlayer.classList.remove("hidden");
  });
});

// ===== SPONSORED ALBUM PLAY =====
document.querySelectorAll(".btn.play").forEach(btn => {
  btn.addEventListener("click", () => {
    audio.play();
    updateIcons(true);
  });
});

// ===== PREMIUM CTA =====
document.querySelectorAll(".gomune-cta, .premium-btn, .btn-primary").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Redirection vers la page d'abonnement Premium");
  });
});

console.log("🎵 Gomune App initialized!");
