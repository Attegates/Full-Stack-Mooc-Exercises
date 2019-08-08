const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: (root) => {
      const authorId = new mongoose.Types.ObjectId(root.id)
      return Book.collection.countDocuments({ author: authorId })
    }
  },

  Book: {
    author: async (root) => {
      return (await Author.findById(root.author))
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("requires authentication")
      }

      let author = await Author.findOne({ name: args.author })
      // Create new author if it does not exist.
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }

      const book = new Book({
        title: args.title,
        author: author,  // skeemassa määritelty ObjectId:ksi, laittaa automaagisesti vain id:n tähän??
        published: args.published,
        genres: args.genres,
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("requires authentication")
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      const updatedAuthor = await Author.findByIdAndUpdate(author.id, { born: args.setBornTo }, { new: true })
      return updatedAuthor
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user) {  // do not care about passwords
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
