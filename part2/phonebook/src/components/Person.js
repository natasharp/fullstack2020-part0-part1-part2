import React from 'react'
import personService from '../services/persons'

const Person = ({ person, setPersons, persons }) => {
    const handleClick = () => {
        const result = window.confirm(`Delete ${person.name}`);
        if (result === true) {
            personService
                .remove(person.id)
                .then(setPersons(persons.filter(persona => persona.id !== person.id)))
                .catch(error => {     
                     alert(      
                      `the person '${person.name}' was already deleted from server`      )    
                  setPersons(persons.filter(p => p.id !== person.id))    })
        }
    }
    return (
        <div>
            {person.name} {person.number} <button onClick={handleClick}>delete</button>
        </div>
    )
}

export default Person