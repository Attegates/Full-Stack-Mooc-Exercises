import React from 'react';
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch(addVote(id))
  }

  const anecdoteList = () => {
    anecdotes.sort((a,b) => b.votes - a.votes)
    return (
      anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
    )
  }

  anecdoteList()

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdoteList()}
      <h2>create new</h2>
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App