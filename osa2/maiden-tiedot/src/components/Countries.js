import React from 'react'

const Languages = ({ languages }) => {
  const rows = () => languages.map(language =>
    <li key={language.name}>
      {language.name}
    </li>
  )
  return (
    <div>
      <h3>languages</h3>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

const Flag = ({ flagUrl }) => {
  return (
    <img src={flagUrl} alt="The countrys flag" height="100" width="150"></img>
  )
}

const CountryDetails = ({name, capital, population, languages, flagUrl }) => {
  return (
    <div>
      <h2>{name}</h2>
      capital {capital}
      <br></br>
      population {population}
      <Languages
        languages={languages}
      />
      <Flag
        flagUrl={flagUrl}
      />
    </div>
  )
}

const CountryList = ({ countries }) => {

  const createDetails = (id) => {
    document.getElementById(id).style.display = document.getElementById(id).style.display !== "none" ? "none" : "inline"
  }

  const rows = () => countries.map(country => {
    let style = {
      display: 'none',
    };
    return (
      <div key={country.name}>
        <p>
          {country.name}
          <button type="button" onClick={() => createDetails(country.name)}>show</button>
        </p>
        <div id={country.name} style={style}>
          <CountryDetails
            id={country.name}
            name={country.name}
            capital={country.capital}
            population={country.population}
            languages={country.languages}
            flagUrl={country.flag}
          />
        </div>
      </div>
    )
  }
  )
  return (
    <div>
      {rows()}
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>
        Total {countries.length} matches. Use a more specific filter.
      </div>
    )
  } else if (countries.length === 0) {
    return (
      <div>
        No matches.
      </div>
    )
  } else if (countries.length === 1) {
    const c = countries[0]
    return (
      <div>
        <CountryDetails
          name={c.name}
          capital={c.capital}
          population={c.population}
          languages={c.languages}
          flagUrl={c.flag}
        />
      </div>
    )
  }
  return (
    <div>
      <CountryList
        countries={countries}
      />
    </div>
  )
}

export default Countries
