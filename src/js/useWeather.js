import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";

export function useWeather() {
    const [cityName, setCityName] = useState("");
    const [clouds, setClouds] = useState(0);
    const [feelsLike, setFeelsLike] = useState(0);
    const [temp, setTemp] = useState(0);
    const [weather, setWeather] = useState("");
    const [description, setDescription] = useState("");

    const [weatherBody, setWeatherBody] = useState(document.querySelector(".wrapper"));

    const { data } = useFetch(`https://api.openweathermap.org/data/2.5/weather?lat=53.55&lon=10&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=de&units=metric`)

    useEffect(() => {
        if(data) {
            setCityName(data.name);
            setClouds(data.clouds.all);
            setFeelsLike(Math.round(data.main.feels_like));
            setTemp(Math.round(data.main.temp));
            setWeather(data.weather[0].main);
            setDescription(data.weather[0].description);
        }
    }, [data]);


    /*
    * style weather conditions
    */ 
    const clear = () => {
        if(weatherBody) {
            weatherBody.style.background = "linear-gradient(165deg, #afd1de 0%, #7bb3c8 100%)";
        } else {
            setWeatherBody(document.querySelector(".wrapper"));
        }
    }

    const rain = () => {
        if(weatherBody) {
            for(let i = 0; i <= 20; i++) {
                let raindrop = document.createElement("i");
                raindrop.classList.add("raindrop");
                let size = Math.random() * 3;
                let posX = Math.floor(Math.floor(Math.random() * 600));
                let delay = Math.random() * -30;
                let duration = Math.random() * 15;

                raindrop.style.width = `${0.1 + size}px`;
                raindrop.style.left = `${posX}px`;
                raindrop.style.animationDelay = `${delay}s`;
                raindrop.style.animationDuration = `${1 + duration}s`;

                weatherBody.style.background = "rgb(194, 194, 194)";
                weatherBody.appendChild(raindrop);
            }
        } else {
            setWeatherBody(document.querySelector(".wrapper"));
        }
    }

    const snow = () => {
        if(weatherBody) {
            for(let i = 0; i < 20; i++) {
                let snowflake = document.createElement("div");
                snowflake.classList.add("snowflake");
                let size = Math.random() * 8;
                let posX = Math.floor(Math.floor(Math.random() * 600));
                let delay = Math.random() * -30;
                let duration = Math.random() * 50;

                snowflake.style.width = `${0.1 + size}px`;
                snowflake.style.height = `${0.1 + size}px`;
                snowflake.style.left = `${posX}px`;
                snowflake.style.animationDelay = `${delay}s`;
                snowflake.style.animationDuration = `${1 + duration}s`;

                weatherBody.style.background = "rgb(194, 194, 194)";
                weatherBody.appendChild(snowflake);
            }
        } else {
            setWeatherBody(document.querySelector(".wrapper"));
        }
    }

    const cloud = () => {
        if(weatherBody) {
            for(let i = 0; i < 20; i++) {
                let cloud = document.createElement("div");
                cloud.classList.add("cloud_circle");

                let size = Math.random() * 200;
                let posY = Math.floor(Math.floor(Math.random() * 200));

                let delay = Math.random() * 8;

                cloud.style.width = `${50 + size}px`;
                cloud.style.height = `${size}px`;
                cloud.style.top = `${posY - 100}px`;

                cloud.style["boxShadow"] = `${50 + size}px ${size}px 60px 0px rgba(220,220,220,1)`;
               
                cloud.style.animationDelay = `${delay}s`;
                
                if(clouds > 80) {
                    weatherBody.style.background = "rgb(194, 194, 194)";
                } else {}
                    weatherBody.style.background = "linear-gradient(165deg, #afd1de 0%, #7bb3c8 100%)";
                
                
                weatherBody.appendChild(cloud);
            }
        } else {
            setWeatherBody(document.querySelector(".wrapper"));
        }
    }

    const thunderstorm = () => {
        if(weatherBody) {
            const thunderBg = document.createElement("div");
            thunderBg.classList.add("thunderBg");

            const lightning = document.createElement("div");
            lightning.classList.add("flash", "lightning");

            const small = document.createElement("small");
            small.innerHTML = "Photo by <a href='https://unsplash.com/@paul_1865?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' style='color: #000; font-weight: normal;  text-decoration: none'>Paul Zoetemeijer</a> on <a href='https://unsplash.com/photos/gray-clouds-AtxeOe04PQ8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash' style='color: #000; font-weight: normal; text-decoration: none'>Unsplash</a>";
            small.style.cssText = "color: #000; padding-left: 15px";

            weatherBody.appendChild(thunderBg);
            weatherBody.appendChild(lightning);
            weatherBody.appendChild(small);
        } else {
            setWeatherBody(document.querySelector(".wrapper"));
        }
    }

    const mist = () => {
        if(weatherBody) {
            let mist = document.createElement("div");
            mist.classList.add("mist");

            weatherBody.style.background = "linear-gradient(165deg, #afd1de 0%, #7bb3c8 100%)";
            weatherBody.appendChild(mist);
        } else {
            setWeatherBody(document.querySelector(".wrapper"));
        }
    }

    useEffect(() => {
        if(weather && (clouds >= 0)) {
            if(weather === "Clear") {
                clear();
            }
            if(weather === "Rain" || 
               weather === "Drizzle") {
                rain();
            }
            if(weather === "Snow") {
                snow();
            }
            if(weather === "Clouds") {
                cloud();
            }
            if(weather === "Thunderstorm") {
                thunderstorm();
            }
            if(weather === "Mist" || 
               weather === "Smoke" || 
               weather === "Haze" || 
               weather === "Dust" || 
               weather === "Fog" || 
               weather === "Sand" || 
               weather === "Ash" || 
               weather === "Squall") {
                mist();
            }
        }
    }, [weather, clouds, weatherBody]);


    return { cityName, clouds, feelsLike, temp, weather, description };
}
