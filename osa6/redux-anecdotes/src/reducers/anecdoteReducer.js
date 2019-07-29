import anecdoteService from "../services/anecdoteService";

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'ADD_VOTE':
      const id = action.data.id
      return state.map(a => a.id !== id ? a : action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

const addVote = (anecdote) => {
  return async (dispatch) => {
    const toChange = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(anecdote.id, toChange)
    dispatch({
      type: 'ADD_VOTE',
      data: updatedAnecdote,
    })
  }
}

const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
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
