const notifier = require('node-notifier'); // import notifier dari 'node-notifier';
const moment = require('moment'); // import moment dari 'moment';
const argTime = process.argv.slice(2); // mengambil argumen dari command line, dan menghapus argumen pertama (node index.js)

const POMODORO_DURATION = argTime[0] // mengambil argumen pertama
const BREAK_DURATION = argTime[1] // mengambil argumen kedua

let isWorking = false;
let remainingTime = 0;

// membuat fungsi formattingTime untuk mengubah total detik menjadi format jam:menit:detik
function formattingTime(totalSecond) {
    const duration = moment.duration(totalSecond, 'seconds');
    const hours  = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// membuat fungsi startTimer untuk memulai timer
function startTimer(duration) {
    isWorking = !isWorking;
    remainingTime = duration * 60;

    const timer = setInterval(() => {
        remainingTime-- ;

        const formattedTime = formattingTime(remainingTime);
        console.log(`${isWorking ? 'Work' : 'Break'}: ${formattedTime}`)

        if (remainingTime <= 0) {
            clearInterval(timer);
            notifier.notify({
                title: isWorking ? 'Break Time !' : 'Good Work',
                message: isWorking ? 'Selamat istirahat' : 'Selamat bekerja',
                sound: true,
                wait : true
            });
            startTimer(isWorking ? BREAK_DURATION : POMODORO_DURATION);
        }
    }, 1000);
}

startTimer(POMODORO_DURATION);