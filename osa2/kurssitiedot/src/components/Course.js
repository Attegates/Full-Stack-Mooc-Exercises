import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Content = ({ parts }) => {

  const rows = () => parts.map(part =>
    <Part
      key={part.id}
      name={part.name}
      exercises={part.exercises}
    />
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => {
    return acc + part.exercises
  }, 0)

  return (
    <div>
      <b>total of {total} exercises </b>
    </div>
  )
}

export default Course
