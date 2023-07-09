import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import { convertMs, addLeadingZero } from './helper';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  start: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  daysVal: document.querySelector('.value[data-days]'),
  hoursVal: document.querySelector('.value[data-hours]'),
  minutesVal: document.querySelector('.value[data-minutes]'),
  secondsVal: document.querySelector('.value[data-seconds]'),
};

const { start, input, daysVal, hoursVal, minutesVal, secondsVal } = refs;

start.disabled = true;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    start.disabled = false;
  },
};

const createPicker = flatpickr(input, options);

start.addEventListener('click', onClick);

function onClick() {
  start.disabled = true;
  input.disabled = true;
  setTimer();
  intervalId = setInterval(() => {
    setTimer();
  }, 1000);
}

function setTimer() {
  const selectDate = new Date(input.value).getTime();
  const defaultDateMs = Date.now();
  const { days, hours, minutes, seconds } = convertMs(
    selectDate - defaultDateMs
  );

  daysVal.textContent = addLeadingZero(days);
  hoursVal.textContent = addLeadingZero(hours);
  minutesVal.textContent = addLeadingZero(minutes);
  secondsVal.textContent = addLeadingZero(seconds);

  if (selectDate - defaultDateMs < 1000) {
    clearInterval(intervalId);
    start.disabled = false;
    input.disabled = false;
  }
}
