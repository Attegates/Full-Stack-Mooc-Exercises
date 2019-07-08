import React, { useState, useEffect } from 'react'

import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import FilterForm from './components/FilterForm'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('testi')
  const [newNumber, setNewNumber] = useState('001')
  const [filterBy, setFilterBy] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  // Use effect to handle filterBy, filteredPersons or persons changes.
  useEffect(() => {
    console.log('does this loop??')
    filterBy.length === 0 ? setFilteredPersons(persons) : setFilteredPersons(persons.filter(person => (person.name.toLowerCase().includes(filterBy.toLowerCase()))))
  }, [filterBy, persons]);


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.filter(person => (person.name === newName)).length > 0) {
      alert(`${newName} is already added`)
      return
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
      })

    //setPersons(persons.concat(newPerson))
    // Use effect instead. persons might not be updated yet if this happens here.
    //filterBy.length === 0 ? setFilteredPersons(persons) : setFilteredPersons(persons.filter(person => (person.name.toLowerCase().includes(filterBy.toLowerCase()))))
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
      <Persons persons={filteredPersons} />
    </div>
  )

}

export default App