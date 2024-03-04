const ForecastCard = ({name, tempMin, tempMax, weatherIcon}) => {
    return (
        <div className="forecast">
            <div className="forecast_day">
                { name }
            </div>
            <div className="forecast_temp">
                <p>Min: { tempMin }°</p>
                <p>Max: { tempMax }°</p>
            </div>
            <div className="forecast_icon">
                { weatherIcon }
            </div>
        </div>
    );
}
 
export default ForecastCard;