import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Anecdote = ({anecdote, points}) => {
  return (
    <div>
      {anecdote}
      <br />
      has {points} votes
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomInt = (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  const handleNextClick = (len) => {
    let next;
    // make sure current and next are different
    do {
      next = randomInt(0, len -1)
    } while (selected === next)
    setSelected(next)
  }

  const handleVoteClick = () => {
    let copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  return (
    <div>
      <Anecdote anecdote={props.anecdotes[selected]} points={votes[selected]} />
      <Button handleClick={() => handleVoteClick()} text='vote' />
      <Button handleClick={() => handleNextClick(anecdotes.length)} text='next' />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
