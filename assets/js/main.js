const search = document.getElementById("search"),
  searchResultBtn = document.getElementById("search-result"),
  closeBtn = document.querySelector(".weather-close"),
  weather = document.querySelector(".weather"),
  weatherLocation = document.querySelector(".location"),
  currentWeather = document.querySelector(".current-weather"),
  weatherTemp = document.querySelector(".temp");

function getWeather() {
  let searchVal = search.value;
  let apiKey = "2a522e60a23a5a0ae0cab909955eb3d5";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=metric&lang=tr&appid=${apiKey}`;

  if (search.value !== "") {
    weather.classList.add("active");

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const {
          name,
          weather,
          main: { temp },
        } = data;
        renderWeather(name, weather, temp);
      })
      .catch((error) => {
        console.error(error);
      });

    search.value = "";
  }
}

function renderWeather(name, weather, temp) {
  const { description, icon } = weather[0];
  let weatherIcon;

  switch (icon) {
    case "01d":
    case "01n":
      weatherIcon = "bi bi-brightness-high";
      break;
    case "02d":
    case "02n":
      weatherIcon = "bi bi-cloud-sun";
      break;
    case "03d":
    case "03n":
      weatherIcon = "bi bi-cloud";
      break;
    case "04d":
    case "04n":
      weatherIcon = "bi bi-cloud";
      break;
    case "09d":
    case "09n":
      weatherIcon = "bi bi-cloud-drizzle";
      break;
    case "10d":
    case "10n":
      weatherIcon = "bi bi-cloud-rain";
      break;
    case "11d":
    case "11n":
      weatherIcon = "bi bi-cloud-lightning-rain";
      break;
    case "13d":
    case "13n":
      weatherIcon = "bi bi-snow";
      break;
    case "50d":
    case "50n":
      weatherIcon = "bi bi-cloud-haze";
  }

  weatherLocation.innerHTML = name;
  currentWeather.innerHTML = `
    <i class="${weatherIcon}"></i>
    ${description}
  `;
  weatherTemp.innerHTML = `${Math.round(temp)} °C`;
}

function closeWeather() {
  weather.classList.remove("active");
  weatherLocation.innerHTML = "";
  currentWeather.innerHTML = "";
  weatherTemp.innerHTML = "";
}

searchResultBtn.addEventListener("click", getWeather);
closeBtn.addEventListener("click", closeWeather);
