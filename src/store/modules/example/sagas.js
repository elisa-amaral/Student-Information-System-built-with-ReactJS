import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as actions from './actions'
import * as types from '../types'

const request = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 600)
  })

function* exampleRequest() {
  try {
    yield call(request)
    yield put(actions.buttonClickSuccess())
  } catch (error) {
    toast.error('Error')
    yield put(actions.buttonClickFailure())
  }
}

export default all([takeLatest(types.BUTTON_CLICK_REQUEST, exampleRequest)])
