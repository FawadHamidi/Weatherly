
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/search/current-weather/current-weather';
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/search/forecast/forecast';
import Brand from './components/search/Brand';


function App() {



  
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null);
  const [color, setColor] = useState("Red");

function handleOnSearchChange(searchData){
  const [lat, lon] = searchData.value.split(" ");

  const currentWeatherData = fetch(`${OPEN_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`)
  const forecastWeatherData = fetch(`${OPEN_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`)

  Promise.all([currentWeatherData, forecastWeatherData])
  .then(async (Response) => {
    const weatherResponse = await Response[0].json();
    const forecastResponse = await Response[1].json();

    let weatherMain = weatherResponse.weather[0]["main"]
    let weather = weatherResponse.weather[0]["description"]
    let icon = weatherResponse.weather[0]["icon"]

    if(weather === "clear sky" && icon === "01d" ){
      setColor("#FBBD55")
    }else if(weather === "clear sky" && icon === "01n" ){
      setColor("#6A3FCD")
    }else if(weather ==="few clouds" && icon === "02d"){
      setColor("#E16B4A")
    }else if(weather ==="few clouds" && icon === "02n"){
      setColor("#423E4D")
    }else if(weather ==="scattered clouds"){
      setColor("#9C77CB")
    }else if(weather ==="broken clouds"){
      setColor("#8BACC1")
    }
    else if(weather ==="overcast clouds"){
      setColor("#8BACC1")
    }
    else if(icon ==="50d" || icon ==="50n"){
      setColor("#40A49B")
    }else if(weatherMain ==="Snow"){
      setColor("#3988FF")
    }else if(weatherMain === "Rain" && icon==="10d"){
      setColor("#8BACC1")
    }else if(weatherMain === "Rain" && icon==="10n"){
      setColor("#006E89")
    }
    else if(weatherMain === "Rain" && icon==="13d"){
      setColor("#3988FF")
    }else if(weatherMain === "Rain" || weatherMain === "Drizzle" && icon==="09d"){
      setColor("#FF7E00")
    }else if(weatherMain === "Drizzle"){
      setColor("#3F66DA")
    }
    else if(weatherMain === "Thunderstorm"){
      setColor("#6B40CC")
    }
    else{
      setColor("#252525")
    }

    setCurrentWeather({city: searchData.label, ...weatherResponse});
    setForecastWeather({city: searchData.label, ...forecastResponse});
  })

}

console.log(currentWeather);
console.log(forecastWeather);

  return (
    <div className="container">
    <Brand />

    <Search onSearchChange={handleOnSearchChange}/>
    {currentWeather && <CurrentWeather data = {currentWeather} color = {color} />}
    <Forecast data = {forecastWeather} color = {color}/>
    </div>
  );
}

export default App;
