import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const API_KEY = '630c2f7ff168461c9b7231339241710';

const Dashboard = ({ onLogout }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Kyiv&days=5`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Помилка завантаження даних', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Завантаження...</div>;
    }

    const currentWeather = weatherData.current;

    return (
        <div className="dashboard">
            <div className="weather-card">
                <h6>{weatherData.location.name}</h6>
                <h6>{new Date(currentWeather.last_updated).toLocaleTimeString()}</h6>
                <h1 className="weather-temp">{currentWeather.temp_c}°C</h1>
                <span className="weather-info">{currentWeather.condition.text}</span>
                <div style={{ marginTop: '20px' }}>
                    <div>
                        <i className="fas fa-wind weather-info"></i>
                        <span className="ms-1">{currentWeather.wind_kph} km/h</span>
                    </div>
                    <div>
                        <i className="fas fa-tint weather-info"></i>
                        <span className="ms-1">{currentWeather.humidity}%</span>
                    </div>
                    <div>
                        <i className="fas fa-sun weather-info"></i>
                        <span className="ms-1">{currentWeather.vis_km} км</span>
                    </div>
                </div>
                <img src={currentWeather.condition.icon} alt="weather icon" className="weather-icon" />
            </div>

            <div className="weather-blocks">
                {weatherData.forecast.forecastday.map(day => (
                    <WeatherBlock key={day.date} day={day} />
                ))}
            </div>
        </div>
    );
};

const WeatherBlock = ({ day }) => (
    <div className="weather-block">
        <h3>{day.date}</h3>
        <p>Температура: {day.day.avgtemp_c}°C</p>
        <p>Умови: {day.day.condition.text}</p>
        <img src={day.day.condition.icon} alt="weather icon" className="weather-block-icon" />
    </div>
);

export default Dashboard;
