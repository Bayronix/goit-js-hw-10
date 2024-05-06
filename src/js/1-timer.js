import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const ErrorModule = () => {
  iziToast.error({
    class: 'error-notification',
    title: 'Error',
    timeout: 5000,
    titleColor: '#fff',
    message: 'Please choose a date in the future',
    position: 'topRight',
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    progressBarColor: '#B51B1B',
    close: true,
  });
};

const updateTimerUI = () => {
  const currentTimeData = convertMs(refs.userSelectedDate - Date.now());
  updateUi(currentTimeData);
};

const startTimer = () => {
  refs.buttonStart.disabled = true;

  if (intervalID) {
    clearInterval(intervalID);
  }

  intervalID = setInterval(() => {
    const selectedDate = refs.userSelectedDate;
    const currentTime = Date.now();

    if (selectedDate > currentTime) {
      refs.datePicker.disabled = true;
    } else {
      refs.datePicker.disabled = false;
    }

    const convertedData = convertMs(selectedDate - currentTime);

    if (
      convertedData.days < 0 &&
      convertedData.hours < 0 &&
      convertedData.minutes < 0 &&
      convertedData.seconds < 0
    ) {
      enableButtonAndPicker();
      return clearInterval(intervalID);
    }

    updateUi(convertedData);
  }, 1000);
};

const addLeadingZero = value => String(value).padStart(2, '0');

const updateUi = value => {
  const { days, hours, minutes, seconds } = value;
  const timerValues = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
  };

  timerValues.days.innerText = addLeadingZero(days);
  timerValues.hours.innerText = addLeadingZero(hours);
  timerValues.minutes.innerText = addLeadingZero(minutes);
  timerValues.seconds.innerText = addLeadingZero(seconds);
};

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  datePicker: document.querySelector('#datetime-picker'),
  userSelectedDate: undefined,
};

let intervalID;

flatpickr(refs.datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    const selectedByUserToNumber = new Date(selectedDates[0]).getTime();
    if (selectedByUserToNumber < currentTime) {
      ErrorModule();
    } else {
      refs.buttonStart.disabled = false;
      refs.userSelectedDate = selectedByUserToNumber;
      updateTimerUI();
    }
  },
});
refs.buttonStart.disabled = true;

refs.buttonStart.addEventListener('click', startTimer);

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
