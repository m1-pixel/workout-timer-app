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
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="20" cy="26" r="7"></circle>
      <path d="M26 30 L50 40"></path>
      <path d="M50 40 L78 42"></path>
      <path d="M44 38 L36 64"></path>
      <path d="M62 40 L56 66"></path>
      <path d="M10 72 H86"></path>
    </svg>
  `,
  pushup: `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="22" cy="30" r="6"></circle>
      <path d="M28 34 L54 40"></path>
      <path d="M54 40 L80 40"></path>
      <path d="M46 42 L40 66"></path>
      <path d="M62 42 L58 68"></path>
      <path d="M10 74 H86"></path>
    </svg>
  `,
  situp: `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="30" cy="28" r="6"></circle>
      <path d="M34 34 L52 48"></path>
      <path d="M52 48 L72 56"></path>
      <path d="M40 52 L28 70"></path>
      <path d="M10 74 H86"></path>
    </svg>
  `,
  squat: `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="18" r="7"></circle>
      <path d="M48 26 L48 46"></path>
      <path d="M48 46 L34 58"></path>
      <path d="M48 46 L62 58"></path>
      <path d="M34 58 L30 72"></path>
      <path d="M62 58 L66 72"></path>
      <path d="M16 78 H80"></path>
    </svg>
  `,
  lunge: `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="36" cy="20" r="7"></circle>
      <path d="M36 28 L40 46"></path>
      <path d="M40 46 L62 54"></path>
      <path d="M38 46 L28 70"></path>
      <path d="M18 78 H84"></path>
    </svg>
  `,
  back: `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="26" cy="28" r="6"></circle>
      <path d="M30 34 C40 42 56 46 70 42"></path>
      <path d="M34 40 L28 62"></path>
      <path d="M58 44 L64 66"></path>
      <path d="M14 74 H82"></path>
    </svg>
  `,
  climber: `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="24" cy="22" r="6"></circle>
      <path d="M30 26 L48 36"></path>
      <path d="M48 36 L68 30"></path>
      <path d="M40 38 L30 56"></path>
      <path d="M54 38 L60 62"></path>
      <path d="M12 74 H84"></path>
    </svg>
  `,
  stretch: `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="30" cy="18" r="6"></circle>
      <path d="M30 24 L48 32"></path>
      <path d="M48 32 L68 24"></path>
      <path d="M40 36 L30 58"></path>
      <path d="M12 74 H84"></path>
    </svg>
  `,
  sleep: `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <path d="M18 58 C28 46 44 42 58 46 C66 48 74 54 78 62"></path>
      <circle cx="22" cy="54" r="6"></circle>
      <path d="M26 56 L40 60"></path>
      <path d="M10 76 H86"></path>
      <path d="M62 20 H76"></path>
      <path d="M60 26 H78"></path>
      <path d="M64 14 H74"></path>
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
  document.body.classList.remove("flash");
  void document.body.offsetWidth;
  document.body.classList.add("flash");
  setTimeout(() => document.body.classList.remove("flash"), 350);
}

function notifyTransition() {
  vibrateShort();
  playClick();
  flashBorder();
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
