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

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();

  const delay = parseInt(refs.inputDelay.value);
  const stateValue = getStateValue();

  try {
    if (stateValue === 'fulfilled') {
      await delayFunction(delay);
      showNotification('success', `✅ Fulfilled promise in ${delay}ms`);
    } else if (stateValue === 'rejected') {
      await delayFunction(delay);
      throw new Error(`❌ Rejected promise in ${delay}ms`);
    }
  } catch (error) {
    showNotification('error', error.message);
  } finally {
    refs.form.reset();
  }
}

function getStateValue() {
  for (const input of refs.inputsState) {
    if (input.checked) {
      return input.value;
    }
  }
}

function delayFunction(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
