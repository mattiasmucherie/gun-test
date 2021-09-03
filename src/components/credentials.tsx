import { FormEvent, useState } from 'react'
import styled from 'styled-components'
import { user } from '../user'
import { useStore } from '../App'
import { Button } from '../styles/common-styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Credentials = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useStore((state: any) => state.setUser)

  const onLogin = (event?: FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault()
    user.auth(username, password, ({ err }: any) => {
      if (err) {
        console.error(err)
      } else {
        setUser(username)
      }
    })
  }

  const onSignup = () => {
    user.create(username, password, ({ err }: any) => {
      if (err) {
        console.error(err)
      } else {
        // setUser(username)
        onLogin()
      }
    })
  }

  return (
    <Form onSubmit={onLogin}>
      <div>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <Button type="submit">login</Button>
        <Button type="button" onClick={onSignup}>
          signup
        </Button>
      </div>
    </Form>
  )
}

export default Credentials
