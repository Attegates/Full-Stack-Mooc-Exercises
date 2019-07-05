import React, { useState, useEffect } from 'react'

import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import FilterForm from './components/FilterForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Atte Gates', number: '123' },
    { name: 'Bill Gates', number: '321' },
    { name: 'Gill Bates', number: '000' }
  ])
  const [newName, setNewName] = useState('testi')
  const [newNumber, setNewNumber] = useState('001')
  const [filterBy, setFilterBy] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons);

  // Use effect to handle filterBy, filteredPersons or persons changes.
  useEffect(() => {
    filterBy.length === 0 ? setFilteredPersons(persons) : setFilteredPersons(persons.filter(person => (person.name.toLowerCase().includes(filterBy.toLowerCase()))))
  }, [filterBy, filteredPersons, persons]);


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

    setPersons(persons.concat(newPerson))
    // Use effect instead. persons might not be updated yet if this happens here.
    //filterBy.length === 0 ? setFilteredPersons(persons) : setFilteredPersons(persons.filter(person => (person.name.toLowerCase().includes(filterBy.toLowerCase()))))
    setNewName('')
    setNewNumber('')
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