import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    const newAnecdote = await anecdoteService.create(content)
    props.createAnecdote(newAnecdote)
    props.setNotification(`You created ${content}`)
    setTimeout(() => props.resetNotification(), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="content" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const mapToDispatch = {
  createAnecdote,
  setNotification,
  resetNotification,
}

export default connect(
  null,
  mapToDispatch
)(AnecdoteForm)
