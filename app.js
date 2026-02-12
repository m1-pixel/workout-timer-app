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
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="18" cy="16" r="6"></circle>
      <path d="M22 22 L40 30 L56 30"></path>
      <path d="M30 28 L24 44"></path>
      <path d="M38 30 L34 46"></path>
      <path d="M10 48 H58"></path>
    </svg>
  `,
  pushup: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="16" cy="20" r="5"></circle>
      <path d="M21 24 L40 28 L54 28"></path>
      <path d="M30 30 L26 42"></path>
      <path d="M38 30 L34 44"></path>
      <path d="M8 48 H56"></path>
    </svg>
  `,
  situp: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="24" cy="20" r="5"></circle>
      <path d="M28 24 L40 34"></path>
      <path d="M30 36 L22 46"></path>
      <path d="M40 34 L52 38"></path>
      <path d="M10 50 H54"></path>
    </svg>
  `,
  squat: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="12" r="6"></circle>
      <path d="M32 18 L32 34"></path>
      <path d="M32 34 L20 44"></path>
      <path d="M32 34 L44 44"></path>
      <path d="M12 52 H52"></path>
    </svg>
  `,
  lunge: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="28" cy="14" r="6"></circle>
      <path d="M28 20 L32 34"></path>
      <path d="M32 34 L46 40"></path>
      <path d="M30 34 L22 50"></path>
      <path d="M10 52 H54"></path>
    </svg>
  `,
  back: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="20" cy="20" r="5"></circle>
      <path d="M24 24 C30 28 38 32 46 28"></path>
      <path d="M26 28 L20 44"></path>
      <path d="M38 30 L42 46"></path>
      <path d="M10 50 H54"></path>
    </svg>
  `,
  climber: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="18" cy="16" r="5"></circle>
      <path d="M22 20 L34 28 L48 22"></path>
      <path d="M30 28 L22 40"></path>
      <path d="M36 28 L40 44"></path>
      <path d="M8 48 H56"></path>
    </svg>
  `,
  stretch: `
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="22" cy="16" r="5"></circle>
      <path d="M22 22 L34 30"></path>
      <path d="M34 30 L50 26"></path>
      <path d="M30 34 L22 48"></path>
      <path d="M10 50 H54"></path>
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
  el.exerciseIcon.innerHTML = iconFor(roundName);
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
    vibrateShort();
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

  el.toggleBtn.addEventListener("click", toggleRunning);
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

function iconFor(name) {
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
