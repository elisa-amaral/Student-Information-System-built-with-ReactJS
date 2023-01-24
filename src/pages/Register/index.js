import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { isEmail } from 'validator'
import { useSelector, useDispatch } from 'react-redux'

import { Container } from '../../styles/GlobalStyles'
import { Form } from './styled'
import Loading from '../../components/Loading'
import * as actions from '../../store/modules/auth/actions'

export default function Register() {
  const dispatch = useDispatch()

  const id = useSelector(state => state.auth.user.id)
  const storedFullName = useSelector(state => state.auth.user.full_name)
  const storedEmail = useSelector(state => state.auth.user.email)
  const isLoading = useSelector(state => state.auth.isLoading)

  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!id) return

    setFullName(storedFullName)
    setEmail(storedEmail)
  }, [id, storedFullName, storedEmail])

  async function handleSubmit(e) {
    e.preventDefault()
    let formErrors = false

    if (full_name.length < 5 || full_name.length > 255) {
      formErrors = true
      toast.error('Full Name must have between 5 and 255 characters.')
    }

    if (!isEmail(email)) {
      formErrors = true
      toast.error('Invalid email address.')
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true
      toast.error('Password must have between 6 and 50 characters.')
    }

    if (formErrors) return

    dispatch(actions.registerRequest({ full_name, email, password, id }))
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Edit Account Data' : 'Create Administrator Account'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="full_name">
          Full Name:
          <input
            type="text"
            value={full_name}
            onChange={e => setFullName(e.target.value)}
            placeholder="Name Surname"
          />
        </label>
        <label htmlFor="email">
          Email Address:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@domain.com"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Strong password"
          />
        </label>

        <button type="submit">{id ? 'SAVE' : 'REGISTER'}</button>
      </Form>
    </Container>
  )
}
