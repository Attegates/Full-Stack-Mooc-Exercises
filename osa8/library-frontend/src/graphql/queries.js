import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
    id
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
      published
      genres
      id
      author {
        name
        id
      }
    }
  }
`


const ALL_BOOKS = gql`
{
  allBooks{
    title
    published
    id
    author {
      name
      id
    }
  }
}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export default {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK,
  EDIT_AUTHOR,
  LOGIN
}
