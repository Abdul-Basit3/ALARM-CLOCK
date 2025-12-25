window.onload = () => {
    //defining the handles
    var hour = document.getElementById('hour-hand');
    var minute = document.getElementById('min-hand');
    var second = document.getElementById('sec-hand');
    var analog = document.querySelectorAll('#analog span');


    //updating the clock with current times
    setInterval(() => {
        //definig current time
        var date = new Date();
        var currentHour = date.getHours();
        var currentMinute = date.getMinutes();
        var currentSecond = date.getSeconds();

        hour.style.transform = 'rotate(' + (360 * currentHour) / 12 + 'deg)';

        minute.style.transform = 'rotate(' + (360 * currentMinute) / 60 + 'deg)';

        second.style.transform = 'rotate(' + (360 * currentSecond) / 60 + 'deg)';

        //analog time
        if (currentHour.toString().length == 2) {
            if (currentHour > 12) {
                currentHour = currentHour - 12;
                analog[0].innerText = currentHour;
            } else {
                analog[0].innerText = currentHour;
            }
        } else {
            analog[0].innerText = '0' + currentHour;
        }

        if (currentMinute.toString().length == 2) {
            analog[1].innerText = currentMinute;
        } else {
            analog[1].innerText = '0' + currentMinute;
        }

        if (currentSecond.toString().length == 2) {
            analog[2].innerText = currentSecond;
        } else {
            analog[2].innerText = '0' + currentSecond;
        }

    }, 1000);


    //alarm set
    var getAlarm = document.querySelector('#setAlarmBtn');
    var stopAlarm = document.querySelector('#stopAlarmBtn');
    var container = document.querySelector('#container');
    var alarmBox = document.querySelector('#set-alarm-modal');

    // show set alarm modal
    getAlarm.addEventListener('click', (e) => {
        container.style.opacity = 0.1;
        alarmBox.style.display = 'flex';
    })

    //cancel show alarm modal
    document.querySelector('#cancel').onclick = () => {
        container.style.opacity = 1;
        alarmBox.style.display = 'none';
    }

    //set alarm value
    var alarmValue = document.querySelector('#set-alarm-modal span input[type="time"]');
    var alarmTune = document.querySelector('#set-alarm-modal span select');
    var alarmStorageArray = [];

    document.querySelector('#set-alarm').onclick = () => {
        if (alarmValue.value == '') {
            alert('Please set time for alarm!');
        } else {
            var alarm = alarmValue.value.toString().split(':');
            alarmStorageArray.push({
                hour: alarm[0],
                minute: alarm[1],
                tune: alarmTune.value
            });
            alarmValue.value = '';
            alarmTune.value = '';
            container.style.opacity = 1;
            alarmBox.style.display = 'none';
            alert('New alarm has been create!');
        }
    }


    //ringing the alarms
    var alarmSound = document.querySelector('#alarm-sound');
    setInterval(() => {
        var date = new Date();
        var currentHour = date.getHours();
        var currentMinute = date.getMinutes();
        for (let i = 0; i < alarmStorageArray.length; i++) {
            if (Number(alarmStorageArray[i]['hour']) == currentHour && Number(alarmStorageArray[i]['minute']) == currentMinute) {
                alarmSound.setAttribute("src", `${alarmStorageArray[i]['tune']}.mp3`)
                alarmSound.play();
                stopAlarm.style.display = "inline-block";
                alarmStorageArray = alarmStorageArray.filter((alarm, alarmIndex) => alarmIndex !== i)
            }
        }
    }, 1000)

    // stop alarm when ringing
    stopAlarm.addEventListener("click", e => {
        alarmSound.pause();
        stopAlarm.style.display = "none"
    })

}