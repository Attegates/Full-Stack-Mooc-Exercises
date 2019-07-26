const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'RESET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

const setNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    message: message
  }
}

const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
    message: null
  }
}

export { setNotification, resetNotification }
export default notificationReducer
