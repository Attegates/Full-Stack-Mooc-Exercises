import anecdoteService from "../services/anecdoteService";

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

const createAnecdote = (data) => {
  console.log(data)
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

const initAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export { addVote, createAnecdote, initAnecdotes }
export default anecdoteReducer
