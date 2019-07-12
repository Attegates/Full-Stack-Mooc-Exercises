import React from 'react'

const Notification = ({ message }) => {

  if (message === null) {
    return null
  }


  const messageColor = message.isError ? 'red' : 'green'

  const style = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }


  return (
    <div style={style}>
      {message.message}
    </div>
  )
}

export default Notification