import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import queries from '../graphql/queries'
import { genres as genreList } from '../constants/genres'


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState(genreList[0])
  const [genres, setGenres] = useState([])

  const handleError = (error) => {
    console.error(error)
  }

  const [addBook] = useMutation(queries.ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: queries.ALL_BOOKS }, { query: queries.ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }


  const submit = async (e) => {
    e.preventDefault()

    console.log('add book...')

    await addBook({
      variables: { title, author, published: parseInt(published), genres }
    })


    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <select onChange={({ target }) => setGenre(target.value)}>
            {genreList.map(g =>
              <option key={g} value={g}>{g}</option>
            )}
          </select>
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook