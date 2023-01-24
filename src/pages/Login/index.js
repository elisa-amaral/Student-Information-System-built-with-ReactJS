import React from 'react'
import { toast } from 'react-toastify'
import { isEmail } from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'

import { Container } from '../../styles/GlobalStyles'
import { Form } from './styled'
import * as actions from '../../store/modules/auth/actions'
import Loading from '../../components/Loading'

export default function Login(props) {
  const dispatch = useDispatch()

  const prevPath = get(props, 'location.state.prevPath', '/')

  const isLoading = useSelector(state => state.auth.isLoading)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = e => {
    e.preventDefault()
    let formErrors = false

    if (!isEmail(email)) {
      formErrors = true
      toast.error('Invalid email addresss.')
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true
      toast.error('Invalid password.')
    }

    if (formErrors) return

    dispatch(actions.loginRequest({ email, password, prevPath }))
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Administrator Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">AUTHENTICATE</button>
      </Form>
    </Container>
  )
}
