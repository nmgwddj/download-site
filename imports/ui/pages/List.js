import React from 'react'
import queryString from 'query-string'
import { Pagination } from 'antd'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { withRouter } from 'react-router-dom'
import { withState, compose } from 'recompose'

import PackageCard from '../components/PackageCard'
import Spin from '../components/Spin'
import Packages from '../../api/packages/packages'

const List = ({ isReady, packages }) => {
  return (
    <div>
      <div style={styles.cardList}>
        { isReady ? packages.map(pack => (
          <PackageCard
            key={pack._id}
            packageId={pack._id}
            title={pack.title}
            imageUrl={pack.imageUrl}
            author={pack.author}
            downloadTotal={pack.downloadTotal}
            rating={pack.rating}
          />
        )) : <Spin /> }
      </div>
      <div style={styles.pagination}>
        <Pagination
          style={packages.length > 24 ? {} : {display: 'none'}}
          showQuickJumper
          defaultCurrent={1}
          total={packages.length}
          pageSize={24}
        />
      </div>
    </div>
  )
}

export default compose(
  withRouter,
  withState('currentPage', 'setCurrentPage', 1),
  withTracker(({ location, typeId, currentPage }) => {
    const queryResult = queryString.parse(location.search)
    const { searchTerm } = queryResult
    const handlePackages = Meteor.subscribe('packages.pagination', typeId, searchTerm, currentPage)
    const query = {}

    if (typeId) {
      Object.assign(query, {
        type: typeId
      })
    }

    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i')
      Object.assign(query, {
        title: regex
      })
    }

    return {
      isReady: handlePackages.ready(),
      packages: Packages.find(query).fetch()
    }
  })
)(List)

const styles = {
  cardList: {
    overflow: 'auto',
    marginBottom: 20
  },
  pagination: {
    width: '100%',
    textAlign: 'center'
  }
}
