import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
`


const ALL_BOOKS = gql`
{
  allBooks{
    title
    author
    published
  }
}
`

export default {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK
}
