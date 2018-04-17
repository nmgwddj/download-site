import React from 'react'
import moment from 'moment'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import Routes from '../imports/startup/client/routes'

moment.locale('zh-cn')

Meteor.startup(() => {
  render(
    <Routes />,
    document.getElementById('render-target')
  )
})
