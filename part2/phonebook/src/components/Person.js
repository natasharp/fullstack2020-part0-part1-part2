import React from 'react'

const Person = ({ person, removePersonHandler }) => {
    return (
        <div>
            {person.name}<span> </span>
            {person.number}<span> </span>
            <button onClick={() => removePersonHandler(person)}>delete</button>
        </div>
    )
}

export default Person