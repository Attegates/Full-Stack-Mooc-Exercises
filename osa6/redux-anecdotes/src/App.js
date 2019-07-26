import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

const App = (props) => {

  const initializeAnecdotes = props.initAnecdotes
  useEffect(() => {
    initializeAnecdotes()
  }, [initializeAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)
