import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import './App.css';


function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterInput = (event) => setNewFilter(event.target.value)
  const handleSettingFilter = (country) => setNewFilter(country.name)
  const countriesToDisplay = newFilter === '' ? [] : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Filter
        value={newFilter}
        handler={handleFilterInput} />
      <Countries
        countries={countriesToDisplay}
        settingFilterHandler = {handleSettingFilter}
      />
    </div>
  );
}

export default App;
