const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongo')
  })
  .catch((error) => {
    console.log('error connecting to mongo', error.message)
  })

const typeDefs = gql`

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

`

const resolvers = {
  Query: {
    bookCount: () => { return Book.collection.countDocuments() },
    authorCount: () => { return Author.collection.countDocuments() },

    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }
      if (args.author && args.genre) {
        // TODO
        return Book.find({})
        //return books.filter(b => (b.author === args.author && b.genres.includes(args.genre)))
      }
      if (args.author) {
        // TODO
        return Book.find({})
        //return books.filter(b => b.author === args.author)
      }
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } })
      }
    },
    allAuthors: () => {
      return Author.find({})
    }
  },

  Author: {
    bookCount: (root) => {
      //return books.filter(b => b.author === root.name).length
      // TODO
      return 0
    }
  },

  Book: {
    author: async (root) => {
      return (await Author.findById(root.author))
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      // Create new author if it does not exist.
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({
        title: args.title,
        author: author,  // skeemassa määritelty ObjectId:ksi, laittaa automaagisesti vain id:n tähän??
        published: args.published,
        genres: args.genres,
      })

      await book.save()
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      const updatedAuthor = await Author.findByIdAndUpdate(author.id, { born: args.setBornTo }, { new: true })
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
