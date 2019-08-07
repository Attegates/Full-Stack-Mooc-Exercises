import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import queries from '../graphql/queries'
import { genres } from '../constants/genres'




const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const [filteredBooks, setFilteredBooks] = useState([])
  
  const result = useQuery(queries.ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return (
      <div>loading</div>
    )
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <select onChange={({ target }) => setGenre(target.value)}>
        <option value="all">all</option>
        {genres.map(g =>
          <option key={g} value={g}>{g}</option>
        )}
      </select>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books