// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

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
