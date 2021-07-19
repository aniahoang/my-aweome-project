//CURRENT DATE
let now = new Date();
let days = [
  "Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
]
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes<10) {
  minutes = `0${minutes}`
}
let today = document.getElementById("today");
today.innerHTML = `${day} ${hour}:${minutes}`;

//STARTING CITY + TEMPERATURE
function startingCity(response) {
  let cityNow = response.data.name.toUpperCase();
  document.querySelector("h1").innerHTML = cityNow;
}

function startingTemp(response) {
  let tempNow = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = tempNow;
  
  let farenNow = document.querySelector("#faren");
  farenNow.addEventListener("click", changeFarenNow);
  function changeFarenNow () {
    let tempFahNow = Math.round(1.8 * tempNow + 32);
    document.querySelector("#temp").innerHTML = tempFahNow;

    let celciusNow = document.querySelector("#celcius");
    celciusNow.addEventListener("click", changeCelciusNow);
    function changeCelciusNow () {
      document.querySelector("#temp").innerHTML = tempNow;

      let descriptionElement = document.querySelector("#description");
      descriptionElement.innerHTML = response.data.weather[0].description;
      console.log(response.data.weather[0].description)
    }
  }
}
  let apiKey = "c3b8cc35d84d429bedaca22aa25cdef0";
  let startCity = "Oviedo";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${startCity}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(startingCity);
  axios.get(apiUrl).then(startingTemp);

//SEARCH CITY + CURRENT TEMPERATURE 
function showTemperature(response) {
 let temperature = Math.round(response.data.main.temp);
 document.querySelector("#temp").innerHTML = temperature;

 let descriptionElement = document.querySelector("#description");
 descriptionElement.innerHTML = response.data.weather[0].description;
 let windspeedElement = document.querySelector("#windspeed");
 windspeedElement.innerHTML = Math.round(response.data.wind.speed);
 let humidityElement = document.querySelector("#humidity");
 humidityElement.innerHTML = response.data.main.humidity;
 console.log(response.data);

 let unitFah = document.querySelector("#faren");
 unitFah.addEventListener("click", convertFah);
 function convertFah() {
    let tempfah = Math.round(1.8 * temperature + 32);
    document.querySelector("#temp").innerHTML = tempfah;

    let unitCel = document.querySelector("#celcius");
    unitCel.addEventListener("click", convertCel);
    function convertCel() {
     document.querySelector("#temp").innerHTML =  Math.round(response.data.main.temp);
    }
  }
}
axios.get(apiUrl).then(showTemperature)

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".city");
  let nameCity = city.value;
  document.querySelector("h1").innerHTML = nameCity.toUpperCase();

  let apiKey = "c3b8cc35d84d429bedaca22aa25cdef0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature)
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//TEMPERATURE FOR CURRENT LOCATION
function cityLocate(locate){
  document.querySelector("h1").innerHTML = locate.data.name.toUpperCase();
  let temperature =  Math.round(locate.data.main.temp);
  document.querySelector("#temp").innerHTML = temperature;

  let unitFah = document.querySelector("#faren");
  unitFah.addEventListener("click", convertFah);
  function convertFah() {
    let tempfah = Math.round(1.8 * temperature + 32);
    document.querySelector("#temp").innerHTML = tempfah;

    let unitCel = document.querySelector("#celcius");
    unitCel.addEventListener("click", convertCel);
    function convertCel() {
     document.querySelector("#temp").innerHTML =  Math.round(locate.data.main.temp);
    }
  }
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlLocate = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrlLocate);
  axios.get(apiUrlLocate).then(cityLocate)
}

function locate() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let button = document.querySelector("button");
button.addEventListener("click", locate);

