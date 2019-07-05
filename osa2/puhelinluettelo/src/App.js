import React, { useState } from 'react'

import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Atte Gates', number: '123' },
    { name: 'Bill Gates', number: '321' },
    { name: 'Gill Bates', number: '000' }
  ])
  const [newName, setNewName] = useState('testi')
  const [newNumber, setNewNumber] = useState('001')

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
    setNewName('')
    setNewNumber('')
  }

  const handlePersonNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePersonNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm
        onSubmit={addPerson}
        onNameChange={handlePersonNameChange}
        newName={newName}
        onNumberChange={handlePersonNumberChange}
        newNumber={newNumber} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App