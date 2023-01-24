import React from 'react'
import { Switch } from 'react-router-dom'

import MyRoute from './MyRoute'
import Students from '../pages/Students'
import Student from '../pages/Student'
import Photos from '../pages/Photos'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Error404 from '../pages/Error404'

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Students} isClosed />
      <MyRoute exact path="/student/" component={Student} isClosed />
      <MyRoute exact path="/student/:id/edit" component={Student} isClosed />
      <MyRoute exact path="/photos/:id" component={Photos} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute path="*" component={Error404} />
    </Switch>
  )
}
