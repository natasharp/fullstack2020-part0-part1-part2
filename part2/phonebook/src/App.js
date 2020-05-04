import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNewNotification] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => { setPersons(initialPersons) })
  }, [])

  const handleSubmitingPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newPhone
    }
    const person = persons.find(person => person.name === newPerson.name)
    if (person) {
      updatePerson(person.id, newPerson)
    } else {
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
          addSuccessNotification(returnedPerson)
        })
        .catch(error =>
          addErrorMessage(error.response.data.error))
    }
  }

  const updatePerson = (id, person) => {
    const result = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
    if (result) {
      personService.update(id, person)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setNewName('')
          setNewPhone('')
        })
    }
  }

  const handleNameInput = (event) => setNewName(event.target.value)
  const handlePhoneInput = (event) => setNewPhone(event.target.value)
  const handleFilterInput = (event) => setNewFilter(event.target.value)

  const removePerson = (person) => {
    const result = window.confirm(`Delete ${person.name}`)
    if (result) {
      personService
        .remove(person.id)
        .then(setPersons(persons.filter(p => p.id !== person.id)))
        .catch(error => {
          addErrorMessage(`Information of '${person.name}' has already been removed from server`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const addErrorMessage = (message) => {
    setNewNotification(message)
    setTimeout(() => {
      setNewNotification(null)
    }, 10000)
  }

  const addSuccessNotification = (person) => {
    setNewNotification(`Added ${person.name}`)
    setIsSuccess(true)
    setTimeout(() => {
      setNewNotification(null)
      setIsSuccess(false)
    }, 5000)
  }

  const personsToDisplay = persons.filter(
    person => person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification}
        success={isSuccess} />
      <Filter
        value={newFilter}
        handler={handleFilterInput} />
      <h3>Add a new</h3>
      <PersonForm
        nameValue={newName}
        nameHandler={handleNameInput}
        phoneValue={newPhone}
        phoneHandler={handlePhoneInput}
        submitHandler={handleSubmitingPerson} />
      <h3>Numbers</h3>
      <Persons
        persons={personsToDisplay}
        removePersonHandler={removePerson}
      />
    </div>
  )
}

export default App
