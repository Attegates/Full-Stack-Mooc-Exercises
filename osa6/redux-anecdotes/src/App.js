import React from 'react';
import { addVote, createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch(addVote(id))
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.store.dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App