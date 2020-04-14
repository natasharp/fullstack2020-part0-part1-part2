import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => { setPersons(initialPersons) })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone
    }
    if (persons.map(person => person.name).indexOf(nameObject.name) === -1) {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        })

    } else {
      const result = window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const id = (persons.filter(person => person.name === nameObject.name))[0].id
        personService.update(id, nameObject)
          .then(returnedPerson => { setPersons(persons.map(person => person.id !== id ? person : returnedPerson)) })
          .then(setNewName(''))
          .then(setNewPhone(''))
      }
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
        filter={newFilter}
        setPersons={setPersons} />
    </div>
  )
}

export default App
