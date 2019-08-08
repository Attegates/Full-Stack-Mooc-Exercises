import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import queries from '../graphql/queries'
import { genres } from '../constants/genres'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from "apollo-boost"
import BookList from './BookList'


const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const [filteredBooks, setFilteredBooks] = useState([])
  const client = useApolloClient()

  useEffect(() => {
    // used to query allBooks without parameters if 'all' is selected in genres
    const genreParam = genre !== 'all' ? `(genre: "${genre}")` : ''
    client
      .query({
        query: gql`
          {allBooks${genreParam} {
            title
            published
            id
            genres
            author {
              name
              id
            }
          }
        }
        `
      })
      .then(result => setFilteredBooks(result.data.allBooks))
  }, [genre, client])

  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>
      <p>in genre {genre}</p>
      <select value={genre} onChange={({ target }) => setGenre(target.value)}>
        <option value="all">all</option>
        {genres.map(g =>
          <option key={g} value={g}>{g}</option>
        )}
      </select>
      <BookList
        books={filteredBooks}
      />
    </div>
  )
}

export default Books