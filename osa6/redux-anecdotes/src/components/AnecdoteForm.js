import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    store.dispatch(createAnecdote(content))
    store.dispatch(setNotification(`You created ${content}`))
    setTimeout(() => setNotification(null), 5000)
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

export default AnecdoteForm
