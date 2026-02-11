const state = {
  rounds: ["Übung 1", "Übung 2", "Übung 3"],
  workDuration: 45,
  restDuration: 15,
  currentRoundIndex: 0,
  phase: "idle",
  remaining: 0,
  running: false,
  timerId: null,
};

const el = {
  roundCount: document.getElementById("roundCount"),
  workDuration: document.getElementById("workDuration"),
  restDuration: document.getElementById("restDuration"),
  rounds: document.getElementById("rounds"),
  phaseBadge: document.getElementById("phaseBadge"),
  currentRound: document.getElementById("currentRound"),
  timer: document.getElementById("timer"),
  roundMeta: document.getElementById("roundMeta"),
  toggleBtn: document.getElementById("toggleBtn"),
  skipBtn: document.getElementById("skipBtn"),
  resetBtn: document.getElementById("resetBtn"),
  heroTimer: document.getElementById("heroTimer"),
  heroRound: document.getElementById("heroRound"),
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function renderRounds() {
  el.rounds.innerHTML = "";
  state.rounds.forEach((name, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = name;
    input.placeholder = `Übung ${index + 1}`;
    input.addEventListener("input", (event) => {
      state.rounds[index] = event.target.value.trim() || `Übung ${index + 1}`;
      updateDisplay();
    });
    el.rounds.appendChild(input);
  });
}

function updateDisplay() {
  const phaseLabel = {
    idle: "Bereit",
    work: "Runde",
    rest: "Pause",
    finished: "Fertig",
  }[state.phase];

  const roundName = state.rounds[state.currentRoundIndex] || "Workout";
  const totalRounds = state.rounds.length;
  const roundNumber = Math.min(state.currentRoundIndex + 1, totalRounds);

  el.phaseBadge.textContent = phaseLabel;
  el.currentRound.textContent = roundName;
  el.timer.textContent = formatTime(state.remaining);
  el.roundMeta.textContent = `Runde ${roundNumber} von ${totalRounds}`;
  el.toggleBtn.textContent = state.running ? "Pause" : "Start";

  el.heroTimer.textContent = formatTime(state.remaining);
  el.heroRound.textContent = state.phase === "idle" ? "Setup starten" : roundName;
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
      state.rounds.push(`Übung ${i + 1}`);
    }
  } else if (count < state.rounds.length) {
    state.rounds = state.rounds.slice(0, count);
  }
  renderRounds();
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
  el.skipBtn.addEventListener("click", () => {
    advance();
    updateDisplay();
  });
  el.resetBtn.addEventListener("click", resetSession);
}

function init() {
  renderRounds();
  initSteppers();
  bindInputs();
  updateDisplay();
}

init();
