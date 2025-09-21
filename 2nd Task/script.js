let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

// Format time in hh:mm:ss
function timeToString(time) {
  let diffInHrs = Math.floor(time / 3600000);
  let diffInMin = Math.floor((time % 3600000) / 60000);
  let diffInSec = Math.floor((time % 60000) / 1000);

  let formattedHrs = diffInHrs.toString().padStart(2, "0");
  let formattedMin = diffInMin.toString().padStart(2, "0");
  let formattedSec = diffInSec.toString().padStart(2, "0");

  return `${formattedHrs}:${formattedMin}:${formattedSec}`;
}

// Start / Pause function
function startPause() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.innerHTML = timeToString(elapsedTime);
    }, 1000);
    startPauseBtn.textContent = "Pause";
    running = true;
  } else {
    clearInterval(timerInterval);
    startPauseBtn.textContent = "Start";
    running = false;
  }
}

// Reset function
function reset() {
  clearInterval(timerInterval);
  display.innerHTML = "00:00:00";
  elapsedTime = 0;
  running = false;
  startPauseBtn.textContent = "Start";
  laps.innerHTML = "";
}

// Lap function
function lap() {
  if (running) {
    const li = document.createElement("li");
    li.textContent = timeToString(elapsedTime);
    laps.appendChild(li);
  }
}

startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
