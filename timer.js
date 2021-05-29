
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 600;
const ALERT_THRESHOLD = 200;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};


document.getElementById("app").innerHTML = `
<div class="base-timer">
<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<g class="base-timer__circle">
<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
<path
id="base-timer-path-remaining"
stroke-dasharray="283"
class="base-timer__path-remaining ${remainingPathColor}"
d="
M 50, 50
m -45, 0
a 45,45 0 1,0 90,0
a 45,45 0 1,0 -90,0
"
></path>
</g>
</svg>
<span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
    )}</span>
    </div>
    `;
    
    
    var TIME_LIMIT = 200;
    var remainingPathColor = COLOR_CODES.info.color;
    var timePassed = 0;
    var timeLeft = TIME_LIMIT;
    var timerInterval = null;
    var session_count = 0
    
    function workTime(){
      document.querySelector(".work-time").style.display = "block";
      document.querySelector(".pass-time").style.display = "none" ;
    }
    function passTime(){
      document.querySelector(".work-time").style.display = "none";
      document.querySelector(".pass-time").style.display = "block" ;
    }

    // i know that's just garbage 
    const pomodoroBtn = document.querySelectorAll(".btn-start");
    pomodoroBtn.forEach(item => {item.addEventListener("click",function(e){
        if(e.target.classList.contains("2-hour")){
          TIME_LIMIT = 1500 ;
          session_count = 8;
  
          startTimer();
          workTime();
 
        }
        if(e.target.classList.contains("4-hour")){
          TIME_LIMIT = 1500 ;
          session_count = 16;
  
          startTimer();
          workTime();

        }
        if(e.target.classList.contains("8-hour")){
          TIME_LIMIT = 1500 ;
          session_count = 32;
  
          startTimer();
          workTime();
        }
       
    })
  });
// 1500
// 300
// for 2 hours 4times
    function onTimesUp() {
        clearInterval(timerInterval);
        session_count = session_count -= 1;
        if (session_count <= 0){
          return 1;
        }
        if (session_count % 2 === 0){
          TIME_LIMIT = 1500;
          timePassed = 0;
          startTimer();
          workTime();
        }else{
          TIME_LIMIT = 300;
          timePassed = 0;
          startTimer();
          passTime();
        }



    }
    
    function startTimer() {
        timerInterval = setInterval(() => {
 
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {

      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

