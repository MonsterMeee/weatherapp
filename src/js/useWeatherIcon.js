import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun, 
    faCloud,
    faCloudRain,
    faCloudBolt,
    faSnowman,
    faSmog
} 
from "@fortawesome/free-solid-svg-icons";

export function useWeatherIcon() {
    
    function getWeatherIcon(weather) {
        if(weather === "Clear") {
            return <FontAwesomeIcon icon={ faSun } size="6x" />
        }
        if(weather === "Rain" || 
            weather === "Drizzle") {
            return <FontAwesomeIcon icon={ faCloudRain } size="6x" />
        }
        if(weather === "Snow") {
            return <FontAwesomeIcon icon={ faSnowman } size="6x" />   
        }
        if(weather === "Clouds") {
            return <FontAwesomeIcon icon={ faCloud } size="6x" />    
        }
        if(weather === "Thunderstorm") {
            return <FontAwesomeIcon icon={ faCloudBolt } size="6x" />    
        }
        if(weather === "Mist" || 
            weather === "Smoke" || 
            weather === "Haze" || 
            weather === "Dust" || 
            weather === "Fog" || 
            weather === "Sand" || 
            weather === "Ash" || 
            weather === "Squall") {
            return <FontAwesomeIcon icon={ faSmog } size="6x" />   
        }
    }


    return { getWeatherIcon };
}
