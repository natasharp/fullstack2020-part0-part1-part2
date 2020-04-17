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
    if (persons
      .map(person => person.name.toLowerCase())
      .indexOf(newPerson.name.toLowerCase()) === -1) {
      addPerson(newPerson)
    } else {
      updatePerson(newPerson)
    }
  }

  const addPerson = (person) => {
    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhone('')
        addSuccessNotification(returnedPerson)
      })
  }

  const updatePerson = (newPersonInfo) => {
    const person = persons.find(person => person.name.toLowerCase() === newPersonInfo.name.toLowerCase())
    const result = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
    if (result) {
      personService.update(person.id, newPersonInfo)
        .then(returnedPerson => { setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson)) })
        .then(setNewName(''))
        .then(setNewPhone(''))
        .catch(error => {
          addDeleteErrorNotification(person)
          setPersons(persons.filter(p => p.id !== person.id))
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
          addDeleteErrorNotification(person)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const addDeleteErrorNotification = (person) => {
    setNewNotification(`Information of '${person.name}' has already been removed from server`)
    setTimeout(() => {
      setNewNotification(null)
    }, 5000)
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
