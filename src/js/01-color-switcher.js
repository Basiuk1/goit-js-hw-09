function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const backgroundBody = document.querySelector('body');

buttonStart.addEventListener('click', () => {
  intervalId = setInterval(() => {
    backgroundBody.style.background = getRandomHexColor();
  }, 1000);

  buttonStart.setAttribute('disabled', 'disabled');
  buttonStop.removeAttribute('disabled');
});

buttonStop.addEventListener('click', () => {
  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', 'disabled');
  clearInterval(intervalId);
});
