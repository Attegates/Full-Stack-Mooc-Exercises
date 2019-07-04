import React from 'react'
import ReactDOM from 'react-dom'


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

const Total = ({parts}) => {
  const total = parts.reduce( (acc, part) => {
    return acc + part.exercises
  }, 0)

  return (
    <div>
      <b>total of {total} exercises </b>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 0 // hard coded ids...
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 1
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 2
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
