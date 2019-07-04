import React from 'react'
import Course from './components/Course'

const App = ({ courses }) => {

  const courseElements = () => courses.map(course =>
    <Course
      key={course.name}
      course={course}
    />
  )

  return (
    <div>
      {courseElements()}
    </div>
  )
}

export default App
