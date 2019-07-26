import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const filter = props.filter

  const vote = (id) => {
    props.addVote(id)
  }

  const handleVoteClick = (id, content) => {
    vote(id)
    props.setNotification(`You voted '${content}'`)
    setTimeout(() => props.resetNotification(), 5000)
  }


  const anecdoteList = () => {
    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
      anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdoteReducer,
    filter: state.filterReducer,
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
