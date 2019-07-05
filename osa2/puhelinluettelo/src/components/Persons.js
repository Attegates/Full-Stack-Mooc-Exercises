import React from 'react'

const Person = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

const Persons = ({ persons }) => {
  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      name={person.name}
      number={person.number}
    />
  )
  return (
    <div>
      {rows()}      
    </div>
  )
}

export default Persons
