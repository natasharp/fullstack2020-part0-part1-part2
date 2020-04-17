import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState({ weather_icons: [] })
    const key = process.env.REACT_APP_WEATHER_API_KEY
    const hook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${key}&query=${country.name}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }
    useEffect(hook, [])

    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map((language, i) =>
                    <li key={i}>
                        {language.name}
                    </li>)}
            </ul>
            <img id="flag-img" src={country.flag} alt='flag' />
            <h3>Weather in {country.capital}</h3>
            <div>temperature: {weather.temperature} celcius</div>
            <img id="flag-img" src={weather.weather_icons[0]} alt='weather icon' />
            <div>wind: {weather.wind_speed} mph direction {weather.wind_dir}</div>
        </div>
    )
}

export default CountryDetails