import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import queries from '../graphql/queries'
import AuthorBirthYearForm from './AuthorBirthYearForm'

const Authors = (props) => {
  const result = useQuery(queries.ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (

    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={props.showEditAuthor} >
        <h3>Set birthyear</h3>
        <AuthorBirthYearForm authors={authors} />
      </div>
    </div>
  )
}

export default Authors