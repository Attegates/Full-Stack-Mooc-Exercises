import React, { useState } from 'react'

import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Atte Gates' },
    { name: 'Bill Gates' },
    { name: 'Gill Bates' }
  ])
  const [newName, setNewName] = useState('testi')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handlePersonNameChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddPersonForm onSubmit={addPerson} onNameChange={handlePersonNameChange} newName={newName} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App