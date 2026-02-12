const EXERCISES = [
  "Planken",
  "Liegestütze",
  "Situps",
  "Kniebeugen",
  "Ausfallschritte",
  "Superman",
  "Bergsteiger",
  "Seitstütz",
  "Rückenstrecker",
  "Hüftbrücke",
  "Schulter dehnen",
  "Hüfte dehnen",
  "Knie dehnen",
  "Rücken dehnen",
  "Arme dehnen",
];

const ICONS = {
  plank: `
    <svg class="icon plank" viewBox="0 0 120 120" aria-hidden="true">
      <path class="ground" d="M8 96 H112"></path>
      <circle class="skin" cx="26" cy="40" r="9"></circle>
      <path class="hair" d="M18 36 C22 30 30 30 34 36"></path>
      <path d="M32 46 L62 52 L98 54"></path>
      <path class="skin" d="M44 52 L38 76"></path>
      <path class="skin" d="M56 54 L52 80"></path>
      <path class="cloth" d="M58 52 L74 56 L72 66 L56 62 Z"></path>
      <path class="skin" d="M76 56 L72 86"></path>
      <path class="skin" d="M88 56 L90 88"></path>
    </svg>
  `,
  pushup: `
    <svg class="icon pushup" viewBox="0 0 120 120" aria-hidden="true">
      <path class="ground" d="M8 96 H112"></path>
      <circle class="skin" cx="28" cy="50" r="9"></circle>
      <path class="hair" d="M20 46 C24 40 32 40 36 46"></path>
      <path d="M36 56 L66 60 L98 64"></path>
      <path class="skin" d="M46 60 L42 82"></path>
      <path class="skin" d="M56 62 L54 86"></path>
      <path class="cloth" d="M58 60 L76 64 L74 74 L56 70 Z"></path>
      <path class="skin" d="M78 64 L76 90"></path>
      <path class="skin" d="M88 66 L90 92"></path>
    </svg>
  `,
  situp: `
    <svg class="icon situp" viewBox="0 0 120 120" aria-hidden="true">
      <path class="ground" d="M8 96 H112"></path>
      <circle class="skin" cx="44" cy="44" r="9"></circle>
      <path class="hair" d="M36 40 C40 34 48 34 52 40"></path>
      <path class="skin" d="M50 50 L68 66"></path>
      <path class="cloth" d="M54 54 L70 68 L62 76 L46 62 Z"></path>
      <path class="skin" d="M40 58 L30 74"></path>
      <path class="skin" d="M60 70 L50 86"></path>
      <path d="M68 66 L94 74"></path>
    </svg>
  `,
  squat: `
    <svg class="icon squat" viewBox="0 0 120 120" aria-hidden="true">
      <path class="ground" d="M8 96 H112"></path>
      <circle class="skin" cx="72" cy="28" r="9"></circle>
      <path class="hair" d="M64 24 C68 18 76 18 80 24"></path>
      <path class="skin" d="M72 36 L72 56"></path>
      <path class="skin" d="M72 44 L50 42"></path>
      <path class="skin" d="M72 44 L94 42"></path>
      <path class="cloth" d="M64 56 L80 56 L82 70 L62 70 Z"></path>
      <path class="skin" d="M62 70 L44 84"></path>
      <path class="skin" d="M82 70 L96 84"></path>
    </svg>
  `,
  lunge: `
    <svg class="icon lunge" viewBox="0 0 120 120" aria-hidden="true">
      <path class="ground" d="M8 96 H112"></path>
      <circle class="skin" cx="48" cy="30" r="9"></circle>
      <path class="hair" d="M40 26 C44 20 52 20 56 26"></path>
      <path class="skin" d="M48 38 L54 60"></path>
      <path class="skin" d="M50 44 L32 48"></path>
      <path class="skin" d="M50 44 L68 46"></path>
      <path class="cloth" d="M50 58 L66 62 L62 74 L46 70 Z"></path>
      <path class="skin" d="M54 62 L84 70"></path>
      <path class="skin" d="M50 62 L36 90"></path>
    </svg>
  `,
  back: `
    <svg class="icon back" viewBox="0 0 120 120" aria-hidden="true">
      <path class="ground" d="M8 96 H112"></path>
      <circle class="skin" cx="28" cy="52" r="8"></circle>
      <path class="hair" d="M22 48 C26 42 32 42 36 48"></path>
      <path class="skin" d="M36 56 C50 66 72 70 92 64"></path>
      <path class="skin" d="M48 66 L38 86"></path>
      <path class="skin" d="M66 70 L60 90"></path>
      <path class="cloth" d="M58 66 L76 70 L74 84 L56 80 Z"></path>
    </svg>
  `,
  climber: `
    <svg class="icon climber" viewBox="0 0 120 120" aria-hidden="true">
      <path class="ground" d="M8 96 H112"></path>
      <circle class="skin" cx="34" cy="32" r="8"></circle>
      <path class="hair" d="M28 28 C32 22 38 22 42 28"></path>
      <path class="skin" d="M40 38 L60 52"></path>
      <path class="skin" d="M42 40 L26 52"></path>
      <path class="skin" d="M54 48 L72 44"></path>
      <path class="cloth" d="M52 50 L68 54 L64 66 L48 62 Z"></path>
      <path class="skin" d="M52 60 L36 80"></path>
      <path class="skin" d="M66 60 L76 84"></path>
    </svg>
  `,
  stretch: `
    <svg class="icon stretch" viewBox="0 0 120 120" aria-hidden="true">
      <path class="ground" d="M8 96 H112"></path>
      <circle class="skin" cx="46" cy="26" r="8"></circle>
      <path class="hair" d="M40 22 C44 16 52 16 56 22"></path>
      <path class="skin" d="M46 34 L70 44"></path>
      <path class="skin" d="M54 38 L80 26"></path>
      <path class="skin" d="M54 40 L78 46"></path>
      <path class="cloth" d="M58 46 L74 50 L70 62 L54 58 Z"></path>
      <path class="skin" d="M58 60 L46 82"></path>
      <path class="skin" d="M70 60 L60 84"></path>
    </svg>
  `,
  sleep: `
    <svg class="icon sleep" viewBox="0 0 120 120" aria-hidden="true">
      <path class="ground" d="M8 96 H112"></path>
      <path d="M18 70 C34 54 58 50 76 56 C90 60 100 72 102 84"></path>
      <circle class="skin" cx="28" cy="66" r="8"></circle>
      <path class="hair" d="M22 62 C26 56 34 56 38 62"></path>
      <path class="skin" d="M36 68 L54 72"></path>
      <path class="cloth" d="M52 70 L74 74 L72 86 L50 82 Z"></path>
      <path d="M80 22 H96"></path>
      <path d="M78 30 H100"></path>
      <path d="M86 14 H96"></path>
    </svg>
  `,
};

const state = {
  rounds: [],
  workDuration: 50,
  restDuration: 10,
  currentRoundIndex: 0,
  phase: "idle",
  remaining: 0,
  running: false,
  timerId: null,
  wakeLock: null,
  audioCtx: null,
};

const el = {
  roundCount: document.getElementById("roundCount"),
  workDuration: document.getElementById("workDuration"),
  restDuration: document.getElementById("restDuration"),
  currentRound: document.getElementById("currentRound"),
  exerciseIcon: document.getElementById("exerciseIcon"),
  flashOverlay: document.getElementById("flashOverlay"),
  timer: document.getElementById("timer"),
  roundMeta: document.getElementById("roundMeta"),
  toggleBtn: document.getElementById("toggleBtn"),
  resetBtn: document.getElementById("resetBtn"),
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay() {
  const roundName = state.rounds[state.currentRoundIndex] || "Workout";
  const totalRounds = state.rounds.length;
  const roundNumber = Math.min(state.currentRoundIndex + 1, totalRounds);

  el.currentRound.textContent = roundName;
  el.exerciseIcon.innerHTML = iconFor(roundName, state.phase);
  el.exerciseIcon.dataset.phase = state.phase;
  el.timer.textContent = formatTime(state.remaining);
  el.roundMeta.textContent = `${roundNumber} von ${totalRounds}`;
  el.toggleBtn.textContent = state.running ? "Pause" : "Start";
}

function resetSession() {
  stopTimer();
  state.phase = "idle";
  state.currentRoundIndex = 0;
  state.remaining = 0;
  state.running = false;
  updateDisplay();
}

function start() {
  if (state.phase === "finished") {
    resetSession();
  }
  if (state.phase === "idle") {
    state.phase = "work";
    state.remaining = state.workDuration;
  }
  if (state.remaining <= 0) {
    advance();
  }
  startTimer();
}

function pause() {
  stopTimer();
  state.running = false;
  releaseWakeLock();
  updateDisplay();
}

function toggleRunning() {
  if (state.running) {
    pause();
  } else {
    start();
  }
}

function startTimer() {
  stopTimer();
  state.running = true;
  requestWakeLock();
  state.timerId = setInterval(tick, 1000);
  updateDisplay();
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function tick() {
  if (!state.running) return;
  if (state.remaining > 0) {
    state.remaining -= 1;
  }
  if (state.remaining === 0) {
    advance();
  }
  updateDisplay();
}

function advance() {
  if (state.phase === "work" || state.phase === "rest") {
    notifyTransition();
  }
  switch (state.phase) {
    case "idle":
      state.phase = "work";
      state.remaining = state.workDuration;
      break;
    case "work":
      if (state.restDuration > 0) {
        state.phase = "rest";
        state.remaining = state.restDuration;
      } else {
        moveToNextRoundOrFinish();
      }
      break;
    case "rest":
      moveToNextRoundOrFinish();
      break;
    case "finished":
      pause();
      break;
  }
}

function moveToNextRoundOrFinish() {
  if (state.currentRoundIndex + 1 < state.rounds.length) {
    state.currentRoundIndex += 1;
    state.phase = "work";
    state.remaining = state.workDuration;
  } else {
    state.phase = "finished";
    state.remaining = 0;
    pause();
  }
}

function updateRoundCount(newValue) {
  const count = clamp(newValue, 1, 50);
  if (count > state.rounds.length) {
    for (let i = state.rounds.length; i < count; i += 1) {
      state.rounds.push(pickExercise(i));
    }
  } else if (count < state.rounds.length) {
    state.rounds = state.rounds.slice(0, count);
  }
  resetSession();
}

function initSteppers() {
  document.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const delta = Number(button.dataset.step);
      el.roundCount.value = clamp(Number(el.roundCount.value) + delta, 1, 50);
      updateRoundCount(Number(el.roundCount.value));
    });
  });

  document.querySelectorAll("[data-step-work]").forEach((button) => {
    button.addEventListener("click", () => {
      const delta = Number(button.dataset.stepWork);
      el.workDuration.value = clamp(Number(el.workDuration.value) + delta, 5, 1800);
      state.workDuration = Number(el.workDuration.value);
      resetSession();
    });
  });

  document.querySelectorAll("[data-step-rest]").forEach((button) => {
    button.addEventListener("click", () => {
      const delta = Number(button.dataset.stepRest);
      el.restDuration.value = clamp(Number(el.restDuration.value) + delta, 0, 1800);
      state.restDuration = Number(el.restDuration.value);
      resetSession();
    });
  });
}

function bindInputs() {
  el.roundCount.addEventListener("change", (event) => {
    updateRoundCount(Number(event.target.value));
  });

  el.workDuration.addEventListener("change", (event) => {
    state.workDuration = clamp(Number(event.target.value), 5, 1800);
    resetSession();
  });

  el.restDuration.addEventListener("change", (event) => {
    state.restDuration = clamp(Number(event.target.value), 0, 1800);
    resetSession();
  });

  el.toggleBtn.addEventListener("click", () => {
    ensureAudio();
    toggleRunning();
  });
  el.resetBtn.addEventListener("click", resetSession);
}

function init() {
  seedExercises();
  initSteppers();
  bindInputs();
  unlockAudioOnGesture();
  updateDisplay();
}

init();

function seedExercises() {
  const shuffled = [...EXERCISES].sort(() => Math.random() - 0.5);
  const count = Number(el.roundCount.value) || 10;
  state.rounds = Array.from({ length: count }, (_, index) => shuffled[index % shuffled.length]);
}

function pickExercise(index) {
  const pool = [...EXERCISES].sort(() => Math.random() - 0.5);
  return pool[index % pool.length];
}

function iconFor(name, phase) {
  if (phase === "rest") return ICONS.sleep;
  const lowered = name.toLowerCase();
  if (lowered.includes("plank") || lowered.includes("stütz")) return ICONS.plank;
  if (lowered.includes("liegest")) return ICONS.pushup;
  if (lowered.includes("situp") || lowered.includes("sitz")) return ICONS.situp;
  if (lowered.includes("kniebeuge")) return ICONS.squat;
  if (lowered.includes("ausfallschritte")) return ICONS.lunge;
  if (lowered.includes("bergsteiger")) return ICONS.climber;
  if (lowered.includes("superman") || lowered.includes("rücken")) return ICONS.back;
  if (lowered.includes("dehnen")) return ICONS.stretch;
  if (lowered.includes("hüft") || lowered.includes("brücke")) return ICONS.back;
  return ICONS.stretch;
}

function vibrateShort() {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
}

function ensureAudio() {
  if (!state.audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    state.audioCtx = new AudioCtx();
  }
  if (state.audioCtx.state === "suspended") {
    state.audioCtx.resume();
  }
}

function playClick() {
  if (!state.audioCtx) return;
  const osc = state.audioCtx.createOscillator();
  const gain = state.audioCtx.createGain();
  osc.type = "square";
  osc.frequency.value = 950;
  gain.gain.setValueAtTime(0.001, state.audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, state.audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, state.audioCtx.currentTime + 0.08);
  osc.connect(gain).connect(state.audioCtx.destination);
  osc.start();
  osc.stop(state.audioCtx.currentTime + 0.09);
}

function flashBorder() {
  if (!el.flashOverlay) return;
  el.flashOverlay.classList.remove("active");
  void el.flashOverlay.offsetWidth;
  el.flashOverlay.classList.add("active");
  setTimeout(() => el.flashOverlay.classList.remove("active"), 300);
}

function notifyTransition() {
  vibrateStrong();
  playClick();
  setTimeout(playClick, 120);
  flashBorder();
}

function vibrateStrong() {
  if (navigator.vibrate) {
    navigator.vibrate([80, 60, 80]);
  }
}

function unlockAudioOnGesture() {
  const unlock = () => {
    ensureAudio();
    window.removeEventListener("touchstart", unlock);
    window.removeEventListener("pointerdown", unlock);
  };
  window.addEventListener("touchstart", unlock, { once: true, passive: true });
  window.addEventListener("pointerdown", unlock, { once: true });
}

async function requestWakeLock() {
  if (!("wakeLock" in navigator)) return;
  try {
    state.wakeLock = await navigator.wakeLock.request("screen");
  } catch (_) {
    state.wakeLock = null;
  }
}

function releaseWakeLock() {
  if (state.wakeLock) {
    state.wakeLock.release();
    state.wakeLock = null;
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.running) {
    requestWakeLock();
  }
});
