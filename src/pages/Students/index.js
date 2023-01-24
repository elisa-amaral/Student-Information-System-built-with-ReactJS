import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa'

import { toast } from 'react-toastify'
import { Container } from '../../styles/GlobalStyles'
import { StudentContainer, ProfilePicture, NewStudent } from './styled'
import axios from '../../services/axios'

import Loading from '../../components/Loading'

export default function Students() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const response = await axios.get('/students')
      setStudents(response.data)
      setIsLoading(false)
    }

    getData()
  }, [])

  const handleDeleteAsk = e => {
    e.preventDefault()
    const exclamation = e.currentTarget.nextSibling
    exclamation.setAttribute('display', 'block')
    e.currentTarget.remove()
  }

  const handleDelete = async (e, id, index) => {
    e.persist()

    try {
      setIsLoading(true)
      await axios.delete(`/students/${id}`)
      const newStudents = [...students]
      newStudents.splice(index, 1)
      setStudents(newStudents)
      setIsLoading(false)
    } catch (err) {
      const status = get(err, 'response.status', 0)

      if (status === 401) {
        toast.error('Please log in')
      } else {
        toast.error('An error occurred while deleting the student')
      }

      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Students</h1>

      <NewStudent to="/student/">Add New Student</NewStudent>

      <StudentContainer>
        {students.map((student, index) => (
          <div key={String(student.id)}>
            <ProfilePicture>
              {get(student, 'Photos[0].url', '') ? (
                <img src={student.Photos[0].url} alt="Student" />
              ) : (
                <FaUserCircle size={135} />
              )}
            </ProfilePicture>

            <span>{student.first_name}</span>
            <span>{student.last_name}</span>
            <span id="email">{student.email}</span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={28} />
            </Link>

            <Link
              onClick={handleDeleteAsk}
              to={`/student/${student.id}/delete`}
            >
              <FaWindowClose size={28} />
            </Link>

            <FaExclamation
              size={20}
              display="none"
              cursor="pointer"
              onClick={e => handleDelete(e, student.id, index)}
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  )
}
