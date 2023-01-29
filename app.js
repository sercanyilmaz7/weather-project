const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const dates = time.getDate();
  const day = time.getDay();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timeOutput.innerHTML =
    days[day] +
    ", " +
    dates +
    " " +
    months[month] +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
}, 1000);

const weatherApp = document.querySelector(".weather-app");
const timeOutput = document.querySelector(".time");
const tempp = document.querySelector(".temp");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const iconn = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
console.log(search);
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

const key = "e38336df8ed6ab9f4ba2f79bd7a0a104";
let cityInput = "London";

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
  });
});

form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("Please enter a city name");
  } else {
    cityInput = search.value;
    // console.log(cityInput);
    fetchWeatherData();
    search.value = "";
  }
  e.preventDefault();
});

function fetchWeatherData() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      weather(data);
    });
}

fetchWeatherData();

function weather(data) {
  //   console.log(data);
  const {
    main: { temp, humidity },
    weather: [{ main, icon }],
    name,
    clouds: { all },
    wind: { speed },
  } = data;
  tempp.innerHTML = temp.toFixed(0) + "&#176;";
  conditionOutput.innerHTML = main;
  iconn.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
  nameOutput.innerHTML = name;
  cloudOutput.innerHTML = all + " %";
  humidityOutput.innerHTML = humidity + " %";
  windOutput.innerHTML = speed + " km/h";
  console.log(main);
  if (main === "Clouds") {
    // weatherApp.style.backgroundColor = "red";
    weatherApp.style.backgroundImage =
      "url(https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/storm-466677_1920.jpg?w=900)";
  } else if (main === "Clear") {
    // weatherApp.style.backgroundColor = "black";
    weatherApp.style.backgroundImage =
      "url(https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yOTk5Mzc4My9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTY5MjE2OTMyNX0.oNAB3J9nFt_qXXdolaV36VlxxnX4Bf7eWoqc71DXRT4/img.jpg?width=980)";
  } else if (main === "Sunny") {
    // weatherApp.style.backgroundColor = "black";
    weatherApp.style.backgroundImage =
      "url(https://www.independent.ie/weather/ea31f/41582369.ece/AUTOCROP/w1240h700/ocean%20sun.jpg)";
  } else if (main === "Rainy") {
    // weatherApp.style.backgroundColor = "black";
    weatherApp.style.backgroundImage =
      "url(https://media.istockphoto.com/id/503284599/tr/foto%C4%9Fraf/rainy-weather.jpg?s=170667a&w=0&k=20&c=tCJVspffUy84PPTad5APgC-IXPCpAwcXy0ojGe3Lu_g=)";
  } else if (main === "Snowy") {
    // weatherApp.style.backgroundColor = "black";
    weatherApp.style.backgroundImage =
      "url(https://www.highcountryweather.com/wp-content/uploads/2016/11/2016-november-03-how-snowy-1024x681.jpg)";
  }
}
