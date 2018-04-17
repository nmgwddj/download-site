import React from 'react'
import queryString from 'query-string'
import { Meteor } from 'meteor/meteor'
import { withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { withState, compose } from 'recompose'

import PackageRow from '../components/PackageRow'
import Types from '../../api/types/types'
import List from './List'
import Spin from '../components/Spin'

const Home = ({ searchMode, types, isReady }) => {
  return (
    <div>
      { isReady ? (searchMode ? <List /> : types.map(type => (
        <PackageRow
          key={type._id}
          name={type.name}
          slug={type.slug}
          typeId={type._id}
        />
      ))) : <Spin />}
    </div>
  )
}

export default compose(
  withRouter,
  withState('currentPage', 'SetCurrentPage', 1),
  withTracker(({ currentPage, location }) => {
    const queryResult = queryString.parse(location.search)
    const { searchTerm } = queryResult
    const handle = Meteor.subscribe('types.all')

    return {
      searchMode: searchTerm !== undefined,
      types: Types.find().fetch(),
      isReady: handle.ready()
    }
  })
)(Home)
