// Function to show/hide sections
function showClock() {
  $(".clock").show();
  $(".stopwatch, .timer").hide();
}

function showStopwatch() {
  $(".stopwatch").show();
  $(".clock, .timer").hide();
}

function showTimer() {
  $(".timer").show();
  $(".clock, .stopwatch").hide();
}

// Event Listeners
$("#stopwatch-btn").click(showStopwatch);
$("#timer-btn").click(showTimer);
$(".back-btn").click(showClock);

// Digital Clock
function updateTime() {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; 

  $("#hour").text(hours.toString().padStart(2, '0'));
  $("#min").text(minutes.toString().padStart(2, '0'));
  $("#sec").text(seconds.toString().padStart(2, '0'));
  $("#ampm").text(ampm);
}
setInterval(updateTime, 1000);
updateTime();

// Stopwatch
let stopwatchRunning = false, stopwatchInterval;
let stopwatchMs = 0, stopwatchSec = 0, stopwatchMin = 0, stopwatchHr = 0;

function updateStopwatch() {
  stopwatchMs++;
  if (stopwatchMs === 100) { stopwatchMs = 0; stopwatchSec++; }
  if (stopwatchSec === 60) { stopwatchSec = 0; stopwatchMin++; }
  if (stopwatchMin === 60) { stopwatchMin = 0; stopwatchHr++; }

  $("#stopwatch-hour").text(stopwatchHr.toString().padStart(2, '0'));
  $("#stopwatch-min").text(stopwatchMin.toString().padStart(2, '0'));
  $("#stopwatch-sec").text(stopwatchSec.toString().padStart(2, '0'));
  $("#stopwatch-ms").text(stopwatchMs.toString().padStart(2, '0'));
}

$(".start-stopwatch").click(function () {
  if (!stopwatchRunning) {
      stopwatchInterval = setInterval(updateStopwatch, 10);
      stopwatchRunning = true;
      $(this).hide();
      $(".lap-stopwatch").show();
  }
});

$(".reset-stopwatch").click(function () {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchMs = stopwatchSec = stopwatchMin = stopwatchHr = 0;
  lapCount = 0;
  updateStopwatch();
  $(".start-stopwatch").show();
  $(".lap-stopwatch").hide();
  $(".stopwatch .laps").html(""); // 🚀 Clear all lap records
});

// 🚀 LAP RECORDING LOGIC
let lapCount = 0;

$(".lap-stopwatch").click(function () {
    if (stopwatchRunning) {
        lapCount++;
        let lapTime = `${stopwatchHr.toString().padStart(2, '0')}:
                       ${stopwatchMin.toString().padStart(2, '0')}:
                       ${stopwatchSec.toString().padStart(2, '0')}:
                       ${stopwatchMs.toString().padStart(2, '0')}`;

        $(".stopwatch .laps").append(`<div class="lap"><p>Lap ${lapCount}</p><p>${lapTime}</p></div>`);
    }
});


// Timer
let timerRunning = false, timerInterval, timerTime = 0;

$(".start-timer").click(function () {
  if (!timerRunning) {
      let minutes = prompt("Enter minutes:");
      if (!isNaN(minutes) && minutes > 0) {
          timerTime = minutes * 60;
          timerRunning = true;
          $(".stop-timer").show();
          $(".start-timer").hide();
          
          timerInterval = setInterval(() => {
              if (timerTime > 0) {
                  timerTime--;
                  $("#timer-min").text(Math.floor(timerTime / 60).toString().padStart(2, '0'));
                  $("#timer-sec").text((timerTime % 60).toString().padStart(2, '0'));
              } else {
                  alert("Time's up!");
                  clearInterval(timerInterval);
                  timerRunning = false;
                  $(".start-timer").show();
                  $(".stop-timer").hide();
              }
          }, 1000);
      }
  }
});

$(".stop-timer").click(function () {
  clearInterval(timerInterval);
  timerRunning = false;
  $(".start-timer").show();
  $(".stop-timer").hide();
});

$(".reset-timer").click(function () {
  clearInterval(timerInterval);
  timerRunning = false;
  timerTime = 0;
  $("#timer-min").text("00");
  $("#timer-sec").text("00");
  $(".start-timer").show();
  $(".stop-timer").hide();
}); 