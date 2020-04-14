import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, setPersons }) => {
    const filteredPersons = persons.filter(
        person => person.name.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            {filteredPersons.map(person =>
                <Person 
                key={person.name} 
                person={person}
                persons={persons}
                setPersons={setPersons}/>
            )}
        </div>
    )
}

export default Persons

