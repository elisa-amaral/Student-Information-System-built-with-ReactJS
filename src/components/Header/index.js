/* eslint-disable no-unused-vars */
import React from 'react'
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import * as actions from '../../store/modules/auth/actions'
import { Nav } from './styled'

export default function Header() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const history = useHistory()

  const handleLogout = e => {
    e.preventDefault()
    dispatch(actions.loginFailure())
    history.push('/')
  }

  return (
    <Nav>
      {/* kind of a hack, could be improved */}
      {isLoggedIn ? (
        <Link to="/">
          <FaHome size={33} />
        </Link>
      ) : (
        <Link to="/" />
      )}

      <Link to="/register">
        <FaUserAlt size={33} />
      </Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={30} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={24} color="#66ff33" />}
    </Nav>
  )
}
