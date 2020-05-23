
var start = document.getElementById('start');
var reset = document.getElementById('reset');
var stop = document.getElementById('stop');

var workMinutes = document.getElementById("work_minutes");
var workSeconds = document.getElementById("work_seconds");

var restMinutes = document.getElementById("rest_minutes");
var restSeconds = document.getElementById("rest_seconds");

var breakHours = document.getElementById("break_hours");
var breakMinutes = document.getElementById("break_minutes");
var breakSeconds = document.getElementById("break_seconds");

var lowFocusBtn = document.getElementById('lowFocusBtn');
var highFocusBtn = document.getElementById('highFocusBtn');

var counter = document.getElementById('counter');
var virtualCounter = 0;

var workTimeMinutesValue = document.getElementById('work-minutes-settings');
var workTimeSecondsValue = document.getElementById('work-seconds-settings');

var restTimeMinutesValue = document.getElementById('rest-minutes-settings');
var restTimeSecondsValue = document.getElementById('rest-seconds-settings');

var breakTimeHoursValue = document.getElementById('break-hours-settings');
var breakTimeMinutesValue = document.getElementById('break-minutes-settings');
var breakTimeSecondsValue = document.getElementById('break-seconds-settings');

var cycleAmountValue = document.getElementById('cycleAmount');

var startTimer;
var startBreakTimer;

start.addEventListener('click', function(){
    if(startTimer === undefined){
        /*
        workMinutes.innerText = workTimeMinutesValue.value;
        workSeconds.innerText = workTimeSecondsValue.value;

        restMinutes.innerText = restTimeMinutesValue.value;
        restSeconds.innerText = restTimeSecondsValue.value;

        breakHours.innerText = breakTimeHoursValue.value;
        breakMinutes.innerText = breakTimeMinutesValue.value;
        breakSeconds.innerText = breakTimeSecondsValue.value;
        */
        startTimer = setInterval(timer, 1000);
    } else {
        console.log("startTimer already running")
    }
})

//Reset Button
reset.addEventListener('click', function(){
    workMinutes.innerText = workTimeMinutesValue.value;
    workSeconds.innerText = workTimeSecondsValue.value;

    restMinutes.innerText = restTimeMinutesValue.value;
    restSeconds.innerText = restTimeSecondsValue.value;

    breakHours.innerText = breakTimeHoursValue.value;
    breakMinutes.innerText = breakTimeMinutesValue.value;
    breakSeconds.innerText = breakTimeSecondsValue.value;

    document.getElementById('counter').innerText = 0;
    document.querySelector('.pomodoro-container').style.backgroundColor = "white";
    stopInterval()
})

//Stop Button
stop.addEventListener('click', function(){
    document.querySelector('.pomodoro-container').style.backgroundColor = "#ff8e3c";
    stopInterval()
    stopBreakInterval()
})


function setValuesFromSettings(){
    workTimeMinutesValue.onchange = function(){
        if(startTimer === undefined){
            workMinutes.innerText = workTimeMinutesValue.value;
        }
    };

    workTimeSecondsValue.onchange = function(){
        if(startTimer === undefined){
            workSeconds.innerText = workTimeSecondsValue.value;
        }
    }

    restTimeMinutesValue.onchange = function(){
        if(startTimer === undefined){
            restMinutes.innerText = restTimeMinutesValue.value;
        }
    }
    restTimeSecondsValue.onchange = function(){
        if(startTimer === undefined){
            restSeconds.innerText = restTimeSecondsValue.value;
        }
    }

    breakTimeHoursValue.onchange = function(){
        if(startTimer === undefined){
            breakHours.innerText = breakTimeHoursValue.value;
        }
    }
    breakTimeMinutesValue.onchange = function(){
        if(startTimer === undefined){
            breakMinutes.innerText = breakTimeMinutesValue.value;
        }
    }
    breakTimeSecondsValue.onchange = function(){
        if(startTimer === undefined){
            breakSeconds.innerText = breakTimeSecondsValue.value;
        }
    }

}
setValuesFromSettings()


//Timer function
function timer(){
    //Work Countdown
    document.querySelector('.pomodoro-container').style.backgroundColor = "#2cb67d";
    if(workSeconds.innerText != 0){
        workSeconds.innerText--;
    } else if(workMinutes.innerText != 0 && workSeconds.innerText == 0){
        workSeconds.innerText = 59;
        workMinutes.innerText--;
    } 

    //Rest Countdown
    if(workMinutes.innerText == 0 && workSeconds.innerText == 0){
        document.querySelector('.pomodoro-container').style.backgroundColor = "#f25042";
        if(restSeconds.innerText != 0){
            restSeconds.innerText--;
        } else if(restMinutes.innerText != 0 && restSeconds.innerText == 0){
            restSeconds.innerText = 59;
            restMinutes.innerText--;
        } 
    }

    //Increment Counter if timer is at 00:00
    if(workMinutes.innerText == 0 && workSeconds.innerText == 0 && restMinutes.innerText == 0 && restSeconds.innerText == 0){
        document.querySelector('.pomodoro-container').style.backgroundColor = "#2cb67d";
        workMinutes.innerText = workTimeMinutesValue.value;
        workSeconds.innerText = workTimeSecondsValue.value;

        restMinutes.innerText = restTimeMinutesValue.value;
        restSeconds.innerText = restTimeSecondsValue.value;

        counter.innerText++;
        virtualCounter++;
        console.log(virtualCounter)
        console.log(cycleAmountValue.value)
    }

    //Start Break Timer if counter is at specific number

    if(cycleAmountValue.value == virtualCounter){
        document.querySelector('.pomodoro-container').style.backgroundColor = "#c14034";
        virtualCounter = 0;
        console.log(virtualCounter)
        stopInterval()
        startBreakTimer = setInterval(startBreak, 1000);
    }
}

//stop the function after pressing the reset button, 
//so the time wont go down when selecting a new time after pressing reset
function stopInterval() {
    clearInterval(startTimer);
    startTimer = undefined;
}
function stopBreakInterval() {
    clearInterval(startBreakTimer);
}


function startBreak() {

    if(breakHours.innerText != 0 && breakMinutes.innerText == 0){
        breakMinutes.innerText = 60;
        breakHours.innerText--;
    } else if(breakMinutes.innerText != 0 && breakSeconds.innerText == 0){
        breakSeconds.innerText = 59;
        breakMinutes.innerText--;
    } else if(breakSeconds.innerText != 0){
        breakSeconds.innerText--;
    } else if(breakHours.innerText == 0 && breakMinutes.innerText == 0 && breakSeconds.innerText == 0){
        console.log("break is over")
        stopBreakInterval()
        startTimer = setInterval(timer, 1000);
        breakHours.innerText = breakTimeHoursValue.value;
        breakMinutes.innerText = breakTimeMinutesValue.value;
        breakSeconds.innerText = breakTimeSecondsValue.value;
    }
}

//recommended buttons
lowFocusBtn.addEventListener('click', function(){
    workTimeMinutesValue.value = 20;
    workTimeSecondsValue.value = "00";

    restTimeMinutesValue.value = "05";
    restTimeSecondsValue.value = "00";

    breakTimeHoursValue.value = "01";
    breakTimeMinutesValue.value = "00"; 
    breakTimeSecondsValue.value = "00";

    cycleAmountValue.value = 6;

    workMinutes.innerText = 20;
    workSeconds.innerText = "00";
    restMinutes.innerText = "05";
    restSeconds.innerText = "00";
    breakHours.innerText = 1;
    breakMinutes.innerText = "00"; 
    breakSeconds.innerText = "00";
})
highFocusBtn.addEventListener('click', function(){
    workTimeMinutesValue.value = 45;
    workTimeSecondsValue.value = "00";

    restTimeMinutesValue.value = 15;
    restTimeSecondsValue.value = "00";

    breakTimeHoursValue.value = "01";
    breakTimeMinutesValue.value = "00"; 
    breakTimeSecondsValue.value = "00";

    cycleAmountValue.value = 2;

    workMinutes.innerText = 45;
    workSeconds.innerText = "00";
    restMinutes.innerText = 15;
    restSeconds.innerText = "00";
    breakHours.innerText = 1;
    breakMinutes.innerText = "00";
    breakSeconds.innerText = "00";
})