import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import queries from '../graphql/queries'


const AuthorBirthYearForm = ({ authors }) => {
  const [name, setName] = useState(authors.length > 0 ? authors[0].name : '')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(queries.EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

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
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
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
