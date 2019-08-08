import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/react-hooks'
import RecommendedBooks from './components/RecommendedBooks'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const showWhenLoggedIn = token ? { display: '' } : { display: 'none' }
  const showWhenLoggedOut = token ? { display: 'none' } : { display: '' }

  useEffect(() => {
    const loggedInUserToken = window.localStorage.getItem('library-user-token')
    setToken(loggedInUserToken)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={showWhenLoggedIn} onClick={() => setPage('add')}>add book</button>
        <button style={showWhenLoggedIn} onClick={() => setPage('recommend')}>recommend</button>
        <button style={showWhenLoggedOut} onClick={() => setPage('login')}>login</button>
        <button style={showWhenLoggedIn} onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        showEditAuthor={showWhenLoggedIn}
      />

      <Books
        show={page === 'books'}
      />

      <RecommendedBooks
        show={page === 'recommend'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={(token) => setToken(token)}
      />

    </div>
  )
}

export default App