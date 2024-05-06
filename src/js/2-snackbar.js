import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name=delay]'),
  inputsState: document.querySelectorAll('input[name=state]'),
};

iziToast.settings({
  timeout: 5000,
  titleColor: '#fff',
  position: 'topRight',
  messageColor: '#fff',
  icon: '',
  close: false,
});

function getDelayValue() {
  return refs.inputDelay.value;
}

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = getDelayValue();
  const stateValue = getStateValue();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (stateValue === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => showNotification('success', message))
    .catch(message => showNotification('error', message));
});

function getStateValue() {
  for (const input of refs.inputsState) {
    if (input.checked) {
      return input.value;
    }
  }
  return 'none';
}

function showNotification(type, message) {
  const backgroundColor = type === 'success' ? '#6ED171' : '#F67474';
  const progressBarColor = type === 'success' ? '#00BF00' : '#F00000';

  iziToast[type]({
    message: message,
    backgroundColor: backgroundColor,
    progressBarColor: progressBarColor,
  });
}
