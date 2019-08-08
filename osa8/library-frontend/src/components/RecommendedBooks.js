import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from "apollo-boost"
import BookList from './BookList'

const RecommendedBooks = (props) => {
  const [books, setBooks] = useState([])
  const [userFavoriteGenre, setUserFavoriteGenre] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    client
      .query({
        query: gql`
          {me {
            favoriteGenre
          }
        }
        `
      })
      .then(result => {
        setUserFavoriteGenre(result.data.me.favoriteGenre)
        return result.data.me.favoriteGenre
      })
      .then(favoriteGenre => {
        client
          .query({
            query: gql`
              {allBooks(genre: "${favoriteGenre}") {
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
          .then(result => setBooks(result.data.allBooks))
      })
  }, [client])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <p>Books in your favourite genre "{userFavoriteGenre}"</p>
      <BookList
        books={books}
      />
    </div>
  )
}

export default RecommendedBooks
