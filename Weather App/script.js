const swiper = new Swiper('.slider-wrapper', {
  loop: false,
  spaceBetween: 20,
  grabCursor: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 3,
    },

    640: {
      slidesPerView: 2,
    },

    768: {
      slidesPerView: 4,
    },

    1024: {
      slidesPerView: 4,
    },

    1200: {
      slidesPerView: 6,
    },
  },
})

//Search DOM
const searchSection = document.querySelector('.search-section'),
  searchInput = searchSection.querySelector('.search-input'),
  buttonSearch = searchSection.querySelector('.btn-search')

//Current DOM
const currentSection = document.querySelector('.current-section'),
  currentCity = currentSection.querySelector('.title'),
  currentDescription = currentSection.querySelector('.description'),
  currentTemperature = currentSection.querySelector('.temperature'),
  currentWeatherIcon = currentSection.querySelector('.weather-icon')

//Hourly DOM
const hourlySection = document.querySelector('.hourly-forecast-section'),
  hourlyList = hourlySection.querySelector('.hourly-list'),
  hourlyTime = hourlySection.querySelector('.time'),
  hourlyWeatherIcon = hourlySection.querySelector('.weather-icon'),
  hourlyTemperature = hourlySection.querySelector('.temperature')

//Air Conditions Dom
const conditionSection = document.querySelector('.conditions-section'),
  realFeel = conditionSection.querySelector('.realFeel .temperature'),
  wind = conditionSection.querySelector('.wind .kph'),
  chanceOfRain = conditionSection.querySelector('.chanceOfRain .rain'),
  uvIndex = conditionSection.querySelector('.uvIndex .uv')

//Daily Dom
const dailySection = document.querySelector('.daily-forecast-section'),
  dailyList = dailySection.querySelector('.daily-list')

//WEATHER CODES
const weatherCodes = {
  clear: [1000],
  clouds: [1003, 1006, 1009],
  mist: [1030, 1135, 1147],
  rain: [
    1063, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1201, 1240, 1243, 1246,
    1273, 1276,
  ],
  moderate_heavy_rain: [1186, 1189, 1192, 1195, 1243, 1246],
  snow: [
    1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222,
    1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282,
  ],
  thunder: [1087, 1279, 1282],
  thunder_rain: [1273, 1276],
}

// GET CURRENT WEATHER DETAİLS

const getCurrentDetails = (data) => {
  const WeatherDescription = Object.keys(weatherCodes).find((icon) =>
    weatherCodes[icon].includes(data.current.condition.code)
  )
  currentCity.textContent = data.location.name
  currentDescription.textContent = WeatherDescription
  currentTemperature.textContent = `${Math.floor(data.current.temp_c)}°`
  currentWeatherIcon.innerHTML = `<img src="img/${WeatherDescription}.svg" alt="" />`
}

//GET HOURLY WEATHER DETAİLS

const getHourlyDetails = (hourlyData) => {
  const current = new Date().setMinutes(0, 0, 0)
  const next24Hours = current + 24 * 60 * 60 * 1000

  const filteredHourlyData = hourlyData.filter((item) => {
    const itemDate = new Date(item.time)
    return itemDate > current && itemDate <= next24Hours
  })

  const foreCastHourlyData = filteredHourlyData
    .map((item) => {
      const WeatherDescription = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(item.condition.code)
      )
      temperature = `${Math.floor(item.temp_c)}°`
      time = item.time.split(' ')[1].substring(0, 5)

      return `<div class="hourly-item swiper-slide">
            <p class="time">${time}</p>
            <img src="img/${WeatherDescription}.svg" class="weather-icon" alt=""/>
            <p class="temperature">${temperature}</p>
            </div>`
    })
    .join('')
  hourlyList.insertAdjacentHTML('afterbegin', foreCastHourlyData)
}

//GET WEATHER'S CONDİTİON DETAİLS

const getConditionDetails = (conditions) => {
  realFeel.textContent = conditions.realFeel
  chanceOfRain.textContent = conditions.chanceOfRain
  wind.textContent = conditions.wind
  uvIndex.textContent = conditions.uv
}

//GET DAİLY WEATHER DETAİLS
const getDailyWeatherDetails = (data) => {
  for (i = 0; i < data.forecast.forecastday.length; i++) {
    const dailyMaxTemp = Math.floor(data.forecast.forecastday[i].day.maxtemp_c)
    const dailyMinTemp = Math.floor(data.forecast.forecastday[i].day.mintemp_c)
    const dailyDescription = data.forecast.forecastday[i].day.condition.text
    const dailyWeatherCode = data.forecast.forecastday[i].day.condition.code

    //get code for daily weather image
    let WeatherDescription = Object.keys(weatherCodes).find((icon) =>
      weatherCodes[icon].includes(dailyWeatherCode)
    )

    //get next 7 days
    const today = new Date()
    today.setDate(today.getDate() + (i + 1))
    const nextDayName = today.toLocaleDateString('en-US', {
      weekday: 'short',
    })
    const li = `<li class="item">
                <p class="day">${nextDayName}</p>
                <span class="daily-description">
                  <img src="img/${WeatherDescription}.svg" alt="" />
                  <p>${dailyDescription}</p>
                </span>
                <p class="temperature">${dailyMaxTemp} / <span class="night">${dailyMinTemp}</span></p>
              </li>`
    dailyList.insertAdjacentHTML('beforeend', li)
  }
}

//CREATE WEATHER DETAİLS

const getWeatherDetails = (data) => {
  //send current weather details
  getCurrentDetails(data)

  //send hourly weather details
  const hourlyData = [
    ...data.forecast.forecastday[0].hour,
    ...data.forecast.forecastday[1].hour,
  ]
  getHourlyDetails(hourlyData)

  //send Air Conditions Details
  const conditions = {
    realFeel: Math.floor(data.current.feelslike_c) + '°',
    wind: data.current.wind_kph,
    chanceOfRain: data.forecast.forecastday[0].day.daily_chance_of_rain,
    uv: data.current.uv,
  }
  getConditionDetails(conditions)

  //Send daily details

  getDailyWeatherDetails(data)
}

//FETCH İNFO ABOUT CİTY FROM APİ

const getWeatherApi = async (cityName) => {
  try {
    const API_KEY = '6e121152d0c84da9a2e182653250711'
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7`

    const response = await fetch(API_URL)
    const data = await response.json()

    console.log(data)

    getWeatherDetails(data)
  } catch (err) {
    console.log(err)
  }
}

//GET İNPUT'S VALUE AFTER CLİCK ENTER

searchInput.addEventListener('keyup', (e) => {
  const cityName = searchInput.value.trim()

  if (e.key === 'Enter' && cityName) {
    searchInput.value = ''
    currentSection.style.visibility = 'visible'
    hourlySection.style.visibility = 'visible'
    conditionSection.style.visibility = 'visible'
    dailySection.style.visibility = 'visible'
    getWeatherApi(cityName)
  }
})

buttonSearch.addEventListener('click', () => {
  const cityName = searchInput.value.trim()
  searchInput.value = ''
  currentSection.style.visibility = 'visible'
  hourlySection.style.visibility = 'visible'
  conditionSection.style.visibility = 'visible'
  dailySection.style.visibility = 'visible'
  getWeatherApi(cityName)
})
