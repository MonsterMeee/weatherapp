import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "./useFetch";
import {
    faSun, 
    faCloud,
    faCloudRain,
    faCloudBolt,
    faSnowman,
    faSmog
} 
from "@fortawesome/free-solid-svg-icons";

export function useForecast() {
    // Forecast for the next 3 days
    const [forecast, setForecast] = useState(null);
    let plusOne, plusTwo, plusThree, 
        plusOneName, plusTwoName, plusThreeName,
        plusOneTemp, plusTwoTemp, plusThreeTemp, 
        plusOneIcon, plusTwoIcon, plusThreeIcon;  
    let forecastWeather = []; 

    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=53.55&lon=10&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
    
    useEffect(() => {
        if(data) {
            setForecast(data.list)
        }
    }, [data]);


    if(forecast) {
        const dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

        plusOne = new Date(); // Create a new date
        plusOne.setDate(plusOne.getDate() + 1); // Add number for next day
        plusOneName = dayNames[plusOne.getUTCDay()]; // Get name for the day
        plusOne = plusOne.toISOString().slice(0, 10); // Slice date for comparison

        plusTwo = new Date();
        plusTwo.setDate(plusTwo.getDate() + 2);
        plusTwoName = dayNames[plusTwo.getUTCDay()];
        plusTwo = plusTwo.toISOString().slice(0, 10);

        plusThree = new Date();
        plusThree.setDate(plusThree.getDate() + 3);
        plusThreeName = dayNames[plusThree.getUTCDay()];
        plusThree = plusThree.toISOString().slice(0, 10);

        // Get weather info for next day(s)
        const plusOneArray = forecast.filter(el => plusOne === (el.dt_txt).slice(0, 10));
        const plusTwoArray = forecast.filter(el => plusTwo === (el.dt_txt).slice(0, 10));
        const plusThreeArray = forecast.filter(el => plusThree === (el.dt_txt).slice(0, 10));
   
        // Get temperature
        plusOneTemp = (plusOneArray.map(el => el.main.temp).sort());
        plusTwoTemp = (plusTwoArray.map(el => el.main.temp).sort());
        plusThreeTemp = (plusThreeArray.map(el => el.main.temp).sort());

        // Get icon
        let plusOneIconArray = forecast.filter(el => plusOne === (el.dt_txt).slice(0, 10));
        plusOneIconArray = plusOneIconArray.map(el => el.weather[0].main);

        let plusTwoIconArray = forecast.filter(el => plusTwo === (el.dt_txt).slice(0, 10));
        plusTwoIconArray = plusTwoIconArray.map(el => el.weather[0].main);

        let plusThreeIconArray = forecast.filter(el => plusThree === (el.dt_txt).slice(0, 10)); 
        plusThreeIconArray = plusThreeIconArray.map(el => el.weather[0].main);
        
        const getWeatherIcon = (weatherArray, weatherIcon) => {
            if (weatherArray.includes("Thunderstorm")) {
                weatherIcon = <FontAwesomeIcon icon={ faCloudBolt } size="2x" />;
            } else if (weatherArray.includes("Snow")) {
                weatherIcon = <FontAwesomeIcon icon={ faSnowman } size="2x" />;
            } else if (weatherArray.includes("Rain") || 
                    weatherArray.includes("Drizzle")) {
                weatherIcon = <FontAwesomeIcon icon={ faCloudRain } size="2x" />;
            } else if (weatherArray.includes("Clouds")) {
                weatherIcon = <FontAwesomeIcon icon={ faCloud } size="2x" />;
            } else if (weatherArray.includes("Mist") || 
                       weatherArray.includes("Smoke") || 
                       weatherArray.includes("Haze") || 
                       weatherArray.includes("Dust") || 
                       weatherArray.includes("Fog") || 
                       weatherArray.includes("Sand") || 
                       weatherArray.includes("Ash") || 
                       weatherArray.includes("Squall")) {
                weatherIcon = <FontAwesomeIcon icon={ faSmog } size="2x" />;
            } else {
                weatherIcon = <FontAwesomeIcon icon={ faSun } size="2x" />;
            }
            forecastWeather.push(weatherIcon);
        }

        getWeatherIcon(plusOneIconArray, plusOneIcon);
        getWeatherIcon(plusTwoIconArray, plusTwoIcon);
        getWeatherIcon(plusThreeIconArray, plusThreeIcon);
    }

    return { plusOneTemp, plusTwoTemp, plusThreeTemp, plusOneName, plusTwoName, plusThreeName, forecastWeather };
}
