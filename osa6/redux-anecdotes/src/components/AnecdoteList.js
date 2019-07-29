import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const vote = (anecdote) => {
    props.addVote(anecdote)
  }

  const handleVoteClick = (anecdote) => {
    vote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`)
    setTimeout(() => props.resetNotification(), 5000)
  }


  const anecdoteList = () => {
    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
      anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVoteClick={handleVoteClick}
        />
      )
    )
  }

  return (
    <div>
      {<Filter />}
      {anecdoteList()}
    </div>
  )

}

const filterAnecdotes = (anecdotes, filter) => {
  return anecdotes.filter(a =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: filterAnecdotes(state.anecdoteReducer, state.filterReducer),
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
  resetNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
