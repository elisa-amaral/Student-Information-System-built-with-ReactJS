/* eslint-disable no-unused-vars */
import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { get } from 'lodash'
import * as actions from './actions'
import * as types from '../types'
import axios from '../../../services/axios'
import history from '../../../services/history'

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload)
    yield put(actions.loginSuccess({ ...response.data }))

    toast.success(`Successfull login!`)

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`

    history.push(payload.prevPath)
  } catch (e) {
    console.log(e)
    toast.error('Invalid email or password.')

    yield put(actions.loginFailure())
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token')

  if (!token) return

  axios.defaults.headers.Authorization = `Bearer ${token}`
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { full_name, email, password, id } = payload

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        full_name,
        password: password || undefined,
      })
      toast.success('Changes successfully saved!')
      yield put(actions.registerUpdatedSuccess({ full_name, email, password }))
    } else {
      yield call(axios.post, '/users', {
        email,
        full_name,
        password,
      })
      toast.success('Account successfully created!')
      yield put(actions.registerCreatedSuccess({ full_name, email, password }))
      history.push('/login')
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', [])
    const status = get(e, 'response.status', 0)

    if (status === 401) {
      toast.error('Please log in again.')
      yield put(actions.loginFailure())
      return history.push('/login')
    }

    if (errors.length > 0) {
      errors.map(error => toast.error(error))
    } else {
      toast.error('Unknown error')
    }

    yield put(actions.registerFailure())
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
])
