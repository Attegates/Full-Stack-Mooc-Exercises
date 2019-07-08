import React, { useState, useEffect } from 'react'
import axios from 'axios'

import API_KEY from './apixyKey'


const Weather = ({ city }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const url = `https://api.apixu.com/v1/current.json?key=${API_KEY}&q=${city}`

    let source = axios.CancelToken.source()

    axios
      .get(url, {cancelToken: source.token})
      .then(response => {
        setWeather(response.data)
      })

      // fixes warning "Can't perform a React state update on an unmounted component"
      return() => {
        source.cancel()
      }

  }, [])

  return (
    <div>
      {weather === null ?
        <p>Fetching weather data </p>
        :
        <div>
          <h3>Weather in {city}</h3>
          <b>temperature: </b><span>{weather.current.temp_c} degrees Celsius</span>
          <br></br>
          <img src={weather.current.condition.icon}></img>
          <b>wind: </b><span>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</span>
        </div>}
    </div>
  )
}

export default Weather
