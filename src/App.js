import { useWeather } from "./js/useWeather";
import { useWeatherIcon } from "./js/useWeatherIcon";
import { useForecast } from "./js/useForecast";
import ForecastCard from "./ForecastCard";

const App = () => {
    const { cityName, feelsLike, temp, weather, description } = useWeather();
    const { plusOneName, plusTwoName, plusThreeName, plusOneTemp, plusTwoTemp, plusThreeTemp, forecastWeather } = useForecast();
    const { getWeatherIcon } = useWeatherIcon(weather);

    return (
        <div className="wrapper">
            <div className="card">
                <div className="card_top">
                    <div className="card_top_left">
                        <div className="city">
                            { cityName }
                        </div>
                        <div className="temp">
                            { temp }°
                        </div>
                        <div className="feels_like">
                            gefühlt wie: { feelsLike }°
                        </div>
                    </div>

                    <div className="card_top_right">
                        <div className="icon">
                            { getWeatherIcon(weather) }
                        </div>

                        <div className="description">
                            { description }
                        </div>
                    </div>
                </div>
                
                {
                    (plusOneTemp && plusTwoTemp && plusThreeTemp) && 
                    <div className="card_bottom">
                        <ForecastCard name={ plusOneName } tempMin={ Math.round(plusOneTemp[0]) } tempMax={ Math.round(plusOneTemp[plusOneTemp.length - 1]) } weatherIcon={ forecastWeather[0] } />
                        <ForecastCard name={ plusTwoName } tempMin={ Math.round(plusTwoTemp[0]) } tempMax={ Math.round(plusTwoTemp[plusTwoTemp.length - 1]) } weatherIcon={ forecastWeather[1] } />
                        <ForecastCard name={ plusThreeName } tempMin={ Math.round(plusThreeTemp[0]) } tempMax={ Math.round(plusThreeTemp[plusThreeTemp.length - 1]) } weatherIcon={ forecastWeather[2] } />
                    </div>
                }
            </div>
        </div>
    );
}
 
export default App;