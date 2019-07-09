import React from 'react'

const Person = ({ name, number }) => {
  return (
    <span>{name} {number}</span>
  )
}

const Persons = ({ persons, deleteClickHandler }) => {
  const rows = () => persons.map(person =>
    <div key={person.name}>
      <Person
        name={person.name}
        number={person.number}
      />
      <button onClick={() => deleteClickHandler(person.id)}>delete</button>
    </div>
  )
  return (
    <div>
      {rows()}
    </div>
  )
}

export default Persons
