import React, { useState, useEffect } from 'react';
import axios from 'axios'

import SearchFilterForm from './components/SearchFilterForm'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')  // Get only required fields.
      .then(response => {
        console.log(response.data)
        setCountries(response.data)   
      })
  }, [])

  
  useEffect(() => {
    console.log("set filtered countries")
    setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase())))
  }, [countries, countryFilter])

  const handleFilterChange = (event) => {
    console.log("filter change event")
    setCountryFilter(event.target.value)
  }

  return (
    <div>
      <SearchFilterForm handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries}/>
    </div>
  );
}

export default App;
