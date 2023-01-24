/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { isEmail, isInt, isFloat } from 'validator'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { FaUserCircle, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import axios from '../../services/axios'
import history from '../../services/history'
import { Container } from '../../styles/GlobalStyles'
import { Form, ProfilePicture, Title } from './styled'
import Loading from '../../components/Loading'
import * as actions from '../../store/modules/auth/actions'

export default function Student({ match }) {
  const dispatch = useDispatch()

  const id = get(match, 'params.id', '')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [photo, setPhoto] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    async function getData() {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`/students/${id}`)
        const Photo = get(data, 'Photos[0].url', '')

        setPhoto(Photo)

        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setAge(data.age)
        setWeight(data.weight)
        setHeight(data.height)

        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        const status = get(err, 'response.status', 0)
        const errors = get(err, 'response.data.errors', [])

        if (status === 400) errors.map(error => toast.error(error))
        history.push('/')
      }
    }

    getData()
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()

    let formErrors = false

    if (first_name.length < 3 || first_name.length > 255) {
      toast.error('First name length must be between 3 and 255 characters.')
      formErrors = true
    }

    if (last_name.length < 3 || last_name.length > 255) {
      toast.error('Last name length must be between 3 and 255 characters.')
      formErrors = true
    }

    if (!isEmail(email)) {
      toast.error('Invalid email address.')
      formErrors = true
    }

    if (!isInt(String(age))) {
      toast.error('Invalid age.')
      formErrors = true
    }

    if (!isFloat(String(weight))) {
      toast.error('Invalid weight.')
      formErrors = true
    }

    if (!isFloat(String(height))) {
      toast.error('Invalid height')
      formErrors = true
    }

    if (formErrors) return

    try {
      setIsLoading(true)

      if (id) {
        await axios.put(`/students/${id}`, {
          first_name,
          last_name,
          email,
          age,
          weight,
          height,
        })
        toast.success('Student data successfully edited!')
      } else {
        const { data } = await axios.post(`/students/`, {
          first_name,
          last_name,
          email,
          age,
          weight,
          height,
        })
        toast.success('Student successfully registered!')
        history.push(`/student/${data.id}/edit`)
      }

      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      const status = get(err, 'response.status', 0)
      const data = get(err, 'response.data', {})
      const errors = get(data, 'errors', [])

      if (errors.length > 0) {
        errors.map(error => toast.error(error))
      } else {
        toast.error('Unknown error')
      }

      if (status === 401) dispatch(actions.loginFailure())
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Edit Student Data' : 'Add New Student'}</Title>

      {id && (
        <ProfilePicture>
          {photo ? (
            <img src={photo} alt={first_name} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={first_name}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={last_name}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          placeholder="Age"
        />
        <input
          type="text"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          placeholder="Weight"
        />
        <input
          type="text"
          value={height}
          onChange={e => setHeight(e.target.value)}
          placeholder="Height"
        />

        <button type="submit">Send</button>
      </Form>
    </Container>
  )
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
}
