import React, {useState, useEffect} from 'react';
import axios from 'axios'


const Country = (props) => {
  const {countries, filter, setFilter} = props
  var displayCountries = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

  const handleButton = (event) => {
    setFilter(event.target.attributes.country.value)
  }

  if (displayCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (displayCountries.length === 1) {
    return (
      <div>
        <h1>{displayCountries[0].name}</h1>
        <p>Capital: {displayCountries[0].capital}</p>
        <p>Population: {displayCountries[0].population}</p>
        <h2>langugages:</h2>
        <ul>
          {displayCountries[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={displayCountries[0].flag} width="150" height="150" />
      </div>
    )
  } else {
    return (
      <div>
        {displayCountries.map(country => <p key={country.name}>{country.name} <button onClick={handleButton} country={country.name}> show </button></p>)}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <p>find countries <input onChange={handleFilterChange}/></p>
      <Country countries={countries} filter={filter} setFilter={setFilter}/>
    </div>
  );
}

export default App;
