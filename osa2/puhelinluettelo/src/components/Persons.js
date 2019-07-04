import React from 'react'

const Person = ({ name }) => {
  return (
    <p>{name}</p>
  )
}

const Persons = ({ persons }) => {
  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      name={person.name}
    />
  )
  return (
    <div>
      {rows()}      
    </div>
  )
}

export default Persons
