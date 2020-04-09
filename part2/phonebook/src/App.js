import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone
    }
    if (persons.map(person => person.name).indexOf(nameObject.name) === -1) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhone('')
    } else {
      window.alert(`${nameObject.name} is already added to phonebook`)
    }
  }
  const handleNameInput = (event) => setNewName(event.target.value)
  const handlePhoneInput = (event) => setNewPhone(event.target.value)
  const handleFilterInput = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={newFilter}
        handler={handleFilterInput} />
      <h3>Add a new</h3>
      <PersonForm
        nameValue={newName}
        nameHandler={handleNameInput}
        phoneValue={newPhone}
        phoneHandler={handlePhoneInput}
        submitHandler={addPerson} />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={newFilter} />
    </div>
  )
}

export default App
