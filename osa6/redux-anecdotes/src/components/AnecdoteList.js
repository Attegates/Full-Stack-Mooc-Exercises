import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdoteReducer
  const notification = store.getState().notificationReducer

  const vote = (id) => {
    store.dispatch(addVote(id))
  }

  const handleVoteClick = (id, content) => {
    vote(id)
    store.dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => store.dispatch(setNotification(null)), 5000)
  }

  const anecdoteList = () => {
    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
      anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteClick(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification message={notification} />
      {anecdoteList()}
    </div>
  )

}

export default AnecdoteList
