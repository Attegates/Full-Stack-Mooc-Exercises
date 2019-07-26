const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'ADD_VOTE':
      const id = action.data.id
      const toChange = state.find(a => a.id === id)
      const changed = { ...toChange, votes: toChange.votes + 1 }
      return state.map(a => a.id !== id ? a : changed)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(content)
  }
}

const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export { addVote, createAnecdote, initAnecdotes }
export default anecdoteReducer
