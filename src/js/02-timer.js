import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDay = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let intervalId = null;
let startTime = null;

startBtn.disabled = true;

startBtn.addEventListener('click', onStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] - Date.now() > 0) {
      startBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      startTime = null;
    }
  },
};

function onStart() {
  startBtn.disabled = true;

  startTime = new Date(input.value);
  intervalId = setInterval(() => {
    if (startTime - Date.now() >= 0) {
      updateTimerClock(convertMs(startTime - Date.now()));
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerClock({ days, hours, minutes, seconds }) {
  dataDay.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}
