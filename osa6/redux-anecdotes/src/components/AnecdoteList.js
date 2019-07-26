import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const notification = props.notification
  const filter = props.filter

  const vote = (id) => {
    //store.dispatch(addVote(id))
  }

  const handleVoteClick = (id, content) => {
    vote(id)
    //store.dispatch(setNotification(`You voted '${content}'`))
    //setTimeout(() => store.dispatch(setNotification(null)), 5000)
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
      <h2>Anecdotes</h2>
      <Notification message={notification} />
      {/*<Filter store={store} />*/}
      {anecdoteList()}
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdoteReducer,
    notification: state.notificationReducer,
    filter: state.filterReducer,
  }

}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
