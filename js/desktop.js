"use strict";

const desk = document.getElementById("desk");
const isPhone = () => window.matchMedia("(max-width: 760px)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function withPlaceholders(str) {
  return escapeHtml(str).replace(/\[(.+?)\]/g, '<span class="placeholder">[$1]</span>');
}

// ---------- Audio ----------

let audioCtx = null;
let masterGain = null;
let soundOn = true;

function getAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    masterGain.gain.value = soundOn ? 1 : 0;
    return audioCtx;
  } catch (err) {
    return null;
  }
}

function playTone(freq, duration, volume, type = "sine", glideTo = null) {
  const ctx = getAudio();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const t = ctx.currentTime;

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t + 0.07);

  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(volume, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  osc.connect(gain).connect(masterGain);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

// Short burst of filtered noise, pitch varies a bit so it doesn't sound robotic.
function playKeyClick() {
  const ctx = getAudio();
  if (!ctx || !soundOn) return;

  const length = Math.floor(ctx.sampleRate * 0.028);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 5);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1600 + Math.random() * 1800;
  filter.Q.value = 1.4;

  const gain = ctx.createGain();
  gain.gain.value = 0.5;

  source.connect(filter).connect(gain).connect(masterGain);
  source.start();
}

const sounds = {
  ding: () => soundOn && playTone(2093, 0.7, 0.08),
  open: () => soundOn && playTone(660, 0.14, 0.09, "sine", 990),
  close: () => soundOn && playTone(520, 0.1, 0.06, "sine", 380),
  tap: () => soundOn && playTone(1320, 0.12, 0.05, "triangle"),
};

const soundToggle = document.getElementById("sound-toggle");
soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? "♪ sound on" : "♪ sound off";
  soundToggle.setAttribute("aria-pressed", soundOn);
  getAudio();
});

// ---------- Clock ----------

function updateClock() {
  const now = new Date();
  const date = now
    .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    .replace(",", "")
    .toLowerCase();
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase();
  document.getElementById("clock").textContent = `${date}  ${time}`;
}

updateClock();
setInterval(updateClock, 15000);

const today = new Date();
document.getElementById("receipt-date").textContent =
  today.toLocaleDateString("en-US") +
  "  " +
  today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

// ---------- Typewriter ----------

// Returns a function that skips to the end.
function typewrite(el, text) {
  const caret = '<span class="caret"></span>';
  let i = 0;
  let timer = null;
  let finished = false;

  const finish = () => {
    finished = true;
    clearTimeout(timer);
    el.innerHTML = escapeHtml(text) + caret;
  };

  if (prefersReducedMotion) {
    finish();
    return finish;
  }

  const step = () => {
    if (finished) return;
    i++;
    el.innerHTML = escapeHtml(text.slice(0, i)) + caret;

    const ch = text[i - 1];
    if (ch === "\n" && text[i] === "\n") sounds.ding();
    else if (ch !== " " && ch !== "\n") playKeyClick();

    if (i >= text.length) {
      finished = true;
      return;
    }

    let delay = 34 + Math.random() * 40;
    if (/[.,!]/.test(ch)) delay += 220;
    if (ch === "\n") delay += 260;
    timer = setTimeout(step, delay);
  };

  step();
  return finish;
}

// ---------- Dragging ----------

function makeDraggable(el, handle = el, onTap = null) {
  let startX, startY, originX, originY;
  let dragging = false;
  let moved = false;

  handle.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".window-buttons button")) return;
    dragging = true;
    moved = false;
    startX = e.clientX;
    startY = e.clientY;

    const rect = el.getBoundingClientRect();
    const deskRect = desk.getBoundingClientRect();
    originX = rect.left - deskRect.left + desk.scrollLeft;
    originY = rect.top - deskRect.top + desk.scrollTop;

    if (!isPhone()) handle.setPointerCapture(e.pointerId);
  });

  handle.addEventListener("pointermove", (e) => {
    if (!dragging || isPhone()) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!moved && Math.hypot(dx, dy) < 5) return;

    if (!moved) {
      moved = true;
      el.style.right = "auto";
      el.style.bottom = "auto";
    }
    el.style.left = `${originX + dx}px`;
    el.style.top = `${Math.max(30, originY + dy)}px`;
  });

  handle.addEventListener("pointerup", () => {
    if (dragging && !moved && onTap) onTap();
    dragging = false;
  });

  handle.addEventListener("pointercancel", () => {
    dragging = false;
  });
}

// ---------- Windows ----------

const openWindows = {};
let topZ = 200;
let windowCount = 0;

function bringToFront(win) {
  win.style.zIndex = ++topZ;
}

function createWindow(id, title, bodyHtml, width) {
  if (openWindows[id]) {
    bringToFront(openWindows[id]);
    return openWindows[id];
  }

  const win = document.createElement("section");
  win.className = "window";
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", title);
  if (width) win.style.width = `min(${width}px, calc(100vw - 32px))`;

  win.innerHTML = `
    <div class="window-bar">
      <div class="window-buttons">
        <button class="btn-close" aria-label="Close ${title}"></button>
        <span class="btn-min"></span>
        <span class="btn-max"></span>
      </div>
      <div class="window-title">${title}</div>
    </div>
    <div class="window-body">${bodyHtml}</div>`;

  desk.appendChild(win);

  // Cascade new windows so they don't stack exactly on top of each other.
  const offset = (windowCount % 5) * 27;
  const left = window.innerWidth / 2 - win.offsetWidth / 2 + offset - 40;
  const top = 70 + offset;
  win.style.left = `${Math.max(12, Math.min(window.innerWidth - win.offsetWidth - 12, left))}px`;
  win.style.top = `${Math.max(40, Math.min(window.innerHeight - win.offsetHeight - 110, top))}px`;
  windowCount++;

  win.querySelector(".btn-close").addEventListener("click", (e) => {
    e.stopPropagation();
    closeWindow(id);
  });
  win.addEventListener("pointerdown", () => bringToFront(win));
  makeDraggable(win, win.querySelector(".window-bar"));

  openWindows[id] = win;
  bringToFront(win);
  sounds.open();
  return win;
}

function closeWindow(id) {
  const win = openWindows[id];
  if (!win) return;
  if (win.skipTyping) win.skipTyping();
  win.remove();
  delete openWindows[id];
  sounds.close();
}

function openAbout() {
  const win = createWindow(
    "about",
    "about-me.txt",
    `<div class="paper"></div><span class="paper-hint">click the page to skip</span>`,
    470
  );
  const paper = win.querySelector(".paper");
  if (win.skipTyping) win.skipTyping();
  win.skipTyping = typewrite(paper, ABOUT_TEXT);
  paper.onclick = () => win.skipTyping();
}

function renderFolder(win, key) {
  const folder = FOLDERS[key];
  win.querySelector(".window-title").textContent = key;
  win.querySelectorAll(".finder-sidebar button").forEach((btn) => {
    btn.setAttribute("aria-current", btn.dataset.folder === key);
  });

  let content;
  if (folder.stickies) {
    content = `<div class="stickies">${folder.stickies
      .map((note) => `<div class="sticky">${withPlaceholders(note)}</div>`)
      .join("")}</div>`;
  } else {
    content = `<div class="finder-items">${folder.items
      .map(
        (item) => `
        <div class="finder-item">
          <div class="finder-item-icon">${item.icon}</div>
          <div>
            <h3>${escapeHtml(item.title)} ${item.year ? `<span class="finder-item-year">· ${item.year}</span>` : ""}</h3>
            <p>${withPlaceholders(item.text)}</p>
          </div>
        </div>`
      )
      .join("")}</div>`;
  }

  win.querySelector(".finder-main").innerHTML = `
    <h2>${key}</h2>
    <p class="finder-subtitle">${escapeHtml(folder.subtitle)}</p>
    ${content}`;
}

function openFolder(key) {
  const alreadyOpen = openWindows.finder;
  const sidebar = Object.keys(FOLDERS)
    .map((k) => `<button data-folder="${k}">${k}</button>`)
    .join("");

  const win = createWindow(
    "finder",
    key,
    `<div class="finder">
      <nav class="finder-sidebar"><h4>favorites</h4>${sidebar}</nav>
      <div class="finder-main"></div>
    </div>`,
    600
  );

  if (alreadyOpen) {
    bringToFront(win);
    sounds.open();
  } else {
    win.querySelector(".finder-sidebar").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-folder]");
      if (!btn) return;
      renderFolder(win, btn.dataset.folder);
      playKeyClick();
    });
  }

  renderFolder(win, key);
}

function openResume() {
  const sections = RESUME.sections
    .map(
      (s) => `
      <h4>${s.heading}</h4>
      <ul>${s.items.map((item) => `<li>${withPlaceholders(item)}</li>`).join("")}</ul>`
    )
    .join("");

  createWindow(
    "resume",
    "resume.pdf",
    `<div class="resume">
      <h2>${RESUME.name}</h2>
      <p class="resume-subtitle">${withPlaceholders(RESUME.subtitle)}</p>
      ${sections}
      <p class="resume-subtitle resume-link">${withPlaceholders(RESUME.link)}</p>
    </div>`,
    460
  );
}

function openContact() {
  const win = createWindow(
    "contact",
    "new message",
    `<div class="mail">
      <div class="mail-field"><span>to:</span><span>marysol</span></div>
      <div class="mail-field"><span>email:</span><span>${withPlaceholders(CONTACT.email)}</span></div>
      <div class="mail-field"><span>linkedin:</span><span>${withPlaceholders(CONTACT.linkedin)}</span></div>
      <div class="mail-field"><span>github:</span><span>${CONTACT.github}</span></div>
      <div class="mail-body"></div>
      <button class="mail-copy">copy github link</button>
    </div>`,
    440
  );

  win.skipTyping = typewrite(win.querySelector(".mail-body"), CONTACT_TEXT);
  win.querySelector(".mail-copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(`https://${CONTACT.github}`);
      showToast("copied ✿");
    } catch (err) {
      showToast(CONTACT.github);
    }
  });
}

function openTrash() {
  createWindow(
    "trash",
    "trash",
    `<div class="trash">
      <div class="trash-icon">🗑</div>
      <p class="trash-title">trash is empty</p>
      <p class="trash-sub">bad ideas get deleted early ✿</p>
    </div>`,
    300
  );
}

function openItem(key) {
  if (key === "about") openAbout();
  else if (key === "resume") openResume();
  else if (key === "contact") openContact();
  else if (key === "trash") openTrash();
  else if (FOLDERS[key]) openFolder(key);
}

// ---------- Desktop ----------

document.querySelectorAll(".icon").forEach((icon) => {
  makeDraggable(icon, icon, () => {
    document.querySelectorAll(".icon.selected").forEach((el) => el.classList.remove("selected"));
    icon.classList.add("selected");
    openItem(icon.dataset.open);
  });

  icon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openItem(icon.dataset.open);
    }
  });
});

["polaroid", "receipt"].forEach((id) => {
  const el = document.getElementById(id);
  makeDraggable(el, el, () => {
    el.style.zIndex = ++topZ;
    sounds.tap();
  });
});

const player = document.getElementById("player");
makeDraggable(player);

document.querySelectorAll(".dock [data-open]").forEach((btn) => {
  btn.addEventListener("click", () => openItem(btn.dataset.open));
});

// ---------- Music player ----------

const MELODY = [
  523.25, 659.25, 783.99, 987.77, 880, 783.99, 659.25, 587.33,
  523.25, 659.25, 783.99, 1046.5, 987.77, 783.99, 659.25, 698.46,
];

const playButton = document.getElementById("play-button");
let musicTimer = null;
let noteIndex = 0;

function toggleMusic() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
    player.classList.remove("playing");
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play");
    return;
  }

  if (!getAudio()) return;
  player.classList.add("playing");
  playButton.textContent = "⏸";
  playButton.setAttribute("aria-label", "Pause");

  musicTimer = setInterval(() => {
    const note = MELODY[noteIndex % MELODY.length];
    playTone(note, 0.6, 0.05, "triangle");
    if (noteIndex % 4 === 0) playTone(note / 2, 1.2, 0.035);
    noteIndex++;
  }, 330);

  if (!soundOn) showToast("sound is off, turn it on up top ♪");
}

playButton.addEventListener("pointerup", (e) => e.stopPropagation());
playButton.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMusic();
});
document.getElementById("dock-music").addEventListener("click", toggleMusic);

// ---------- Notifications ----------

const notifications = document.getElementById("notifications");
let toastTimer = null;

function showToast(message) {
  document.querySelectorAll(".toast").forEach((t) => t.remove());
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.remove(), 2600);
}

function showNotification({ from, text }) {
  const note = document.createElement("button");
  note.className = "notification";
  note.innerHTML = `
    <div class="notification-app">💬</div>
    <div>
      <div class="notification-from"><span>${from}</span><small>now</small></div>
      <div class="notification-text">${escapeHtml(text)}</div>
    </div>`;
  note.addEventListener("click", () => note.remove());
  notifications.appendChild(note);
  sounds.open();
  setTimeout(() => note.remove(), 9000);
}

function playIntroMessages() {
  notifications.innerHTML = "";
  INTRO_MESSAGES.forEach((msg, i) => {
    setTimeout(() => showNotification(msg), 500 + i * 1400);
  });
}

function showAirDrop() {
  const popup = document.createElement("div");
  popup.className = "airdrop";
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-label", "AirDrop");
  popup.innerHTML = `
    <h3>AirDrop</h3>
    <p>marysol would like to share “resume.pdf”.</p>
    <div class="airdrop-preview"><span class="doc pdf"><b>PDF</b></span></div>
    <div class="airdrop-buttons">
      <button class="airdrop-decline">Decline</button>
      <button class="airdrop-accept">Accept</button>
    </div>`;
  document.body.appendChild(popup);

  popup.querySelector(".airdrop-decline").addEventListener("click", () => {
    popup.remove();
    showToast("no worries, it's on the desktop ✿");
  });
  popup.querySelector(".airdrop-accept").addEventListener("click", () => {
    popup.remove();
    openResume();
  });
}

document.getElementById("dock-messages").addEventListener("click", playIntroMessages);

playIntroMessages();
setTimeout(showAirDrop, 5200);
