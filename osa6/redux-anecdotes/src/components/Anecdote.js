import React from 'react'

const Anecdote = ({ anecdote, handleVoteClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button onClick={() => handleVoteClick(anecdote)}>vote</button>
      </div>
    </div>

  )
}

export default Anecdote
