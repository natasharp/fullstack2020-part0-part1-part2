import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = ({ countries, settingFilterHandler }) => {

    if (countries.length === 0) {
        return null
    }
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (countries.length === 1) {
        return (
            <CountryDetails country={countries[0]} />
        )
    }
    return (
        <div>
            {countries.map(country =>
                <Country
                    key={country.name}
                    country={country}
                    handleClick={() => settingFilterHandler(country)}
                />
            )}
        </div>
    )
}

export default Countries