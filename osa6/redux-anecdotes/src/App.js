import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdoteService'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

const App = (props) => {

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => props.initAnecdotes(anecdotes))
  })

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
