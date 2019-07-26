import React from 'react'

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

export default Notification