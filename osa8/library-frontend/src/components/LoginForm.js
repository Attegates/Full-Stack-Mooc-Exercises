import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import queries from '../graphql/queries'


const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(queries.LOGIN)

  const submit = async (event) => {
    event.preventDefault()

    const result = await login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
    setUsername('')
    setPassword('')
  }


  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
