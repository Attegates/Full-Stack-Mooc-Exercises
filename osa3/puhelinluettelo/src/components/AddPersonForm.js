import React from 'react'

const AddPersonForm = (props/*{ onSubmit, onNameChange, newName }*/) => {
  // destructuring props causes newName to be an Object {newName: 'value'} ??
  return (
    <div>
      <h3>Add new</h3>
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input onChange={props.onNameChange} value={props.newName} />
      </div>
      <div>
        number: <input onChange={props.onNumberChange} value={props.newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </div>
  )
}

export default AddPersonForm
