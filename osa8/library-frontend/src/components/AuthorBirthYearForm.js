import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import queries from '../graphql/queries'

const AuthorBirthYearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(queries.EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    console.log('??')

    await editAuthor({
      variables: { name, born: parseInt(born) }
    })
    setName('')
    setBorn('')
  }


  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default AuthorBirthYearForm
