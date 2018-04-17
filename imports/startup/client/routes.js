import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Layout from '../../ui/layouts/Layout'

const Routes = () =>
  <Router>
    <Route path='/' component={Layout} />
  </Router>

export default Routes
