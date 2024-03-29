import React, { useState, useEffect } from 'react'

import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('testi')
  const [newNumber, setNewNumber] = useState('00110')
  const [filterBy, setFilterBy] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  // Use effect to handle filterBy or persons change.
  useEffect(() => {
    filterBy.length === 0 ? setFilteredPersons(persons) : setFilteredPersons(persons.filter(person => (person.name.toLowerCase().includes(filterBy.toLowerCase()))))
  }, [filterBy, persons]);


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.filter(person => (person.name === newName)).length > 0) {
      if (window.confirm(`${newName} is already added. Replace the old number?`)) {
        updatePerson()
        return
      } else {
        return
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedNewPerson => {
        setPersons(persons.concat(returnedNewPerson))
        setNewName('')
        setNewNumber('')
        setMessage({
          message: `Succesfully added ${returnedNewPerson.name}`,
          isError: false
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage({
          message: `${error.response.data.error}`,
          isError: true
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const updatePerson = () => {

    const person = persons.find(p => p.name === newName)
    const changedPerson = { ...person, number: newNumber }

    personService.update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setMessage({
          message: `Succesfully updated number of ${person.name} from ${person.number} to ${returnedPerson.number}`,
          isError: false
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage({
          message: `Error! Information of ${person.name} has been removed from the server!`,
          isError: true
        })
        // Also update persons since a changes have been made at this point.
        personService
          .getAll()
          .then(initialPersons => setPersons(initialPersons))
      })
  }


  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (!window.confirm(`Delete ${person.name} ?`)) {
      return
    }

    personService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setMessage({
          message: `Succesfully removed ${person.name}`,
          isError: false
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        alert(error)
      })
  }


  const handlePersonNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePersonNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value)
    // Use effect instead. filterBy might not be updated yet if this happens here.
    //event.target.value.length === 0 ? setFilteredPersons(persons) : setFilteredPersons(persons.filter(person => (person.name.toLowerCase().includes(event.target.value.toLowerCase()))))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
      />
      <FilterForm
        onFilterByChange={handleFilterByChange}
      />
      <AddPersonForm
        onSubmit={addPerson}
        onNameChange={handlePersonNameChange}
        newName={newName}
        onNumberChange={handlePersonNumberChange}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deleteClickHandler={deletePerson} />
    </div>
  )

}

export default App