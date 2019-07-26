import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (message !== null) {
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
  return null
}

export default connect(
  (state) => {
    return {
      message: state.notificationReducer
    }
  }
)(Notification)