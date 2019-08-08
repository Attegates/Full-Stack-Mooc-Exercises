import { gql } from 'apollo-boost'

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
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

export default BOOK_ADDED
