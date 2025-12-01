const monthsE = document.querySelector("#months");
const daysE = document.querySelector("#days");
const hoursE = document.querySelector("#hours");
const minutesE = document.querySelector("#minutes");
const secondsE = document.querySelector("#seconds");
const countDownDate = new Date("2026/01/01").getTime();

setInterval(countDown, 1000);

function countDown() {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const seconds = Math.floor((distance / 1000) % 60);
  const minutes = Math.floor((distance / 1000 / 60) % 60);
  const hours = Math.floor((distance / 1000 / 60 / 60) % 24);
  const days = Math.floor((distance / 1000 / 60 / 60 / 24) % 30);
  const months = Math.floor((distance / 1000 / 60 / 60 / 24 / 30) % 12);

  secondsE.textContent = format(seconds);
  minutesE.textContent = format(minutes);
  hoursE.textContent = format(hours);
  daysE.textContent = format(days);
  monthsE.textContent = format(months);
}

function format(time) {
  return time < 10 ? `0${time}` : time;
}
