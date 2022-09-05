//WK 4 #1 add day/time 
let dateElement=document.querySelector("#date");
let now= new Date ();

let date= now.getDate();
let hours=now.getHours();
if (hours < 10) {
    hours = `0${hours}`;}
let minutes= now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;}
let year=now.getFullYear();
let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day=days[now.getDay()];
let months= ["January", "Feburary", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"]
let month=months[now.getMonth()];

dateElement.innerHTML= ` ${day}, ${hours}:${minutes}`

//#2 add a search engine , display serached city temperauture on the page after user submits the form
function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#displayTemp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#tempDescription").innerHTML =
      response.data.weather[0].main;
  }
  
function searchCity(city) {
    let apiKey = "b5fb4a526e24f0e48b27c52886b74e1a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  function searchLocation(position) {
    let apiKey = "b5fb4a526e24f0e48b27c52886b74e1a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeather);
  }
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let searchForm = document.querySelector("#form-group");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  searchCity();
  