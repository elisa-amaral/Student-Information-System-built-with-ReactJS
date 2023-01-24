import { all } from 'redux-saga/effects'

import auth from './auth/sagas'

export default function* rootSage() {
  return yield all([auth])
}
