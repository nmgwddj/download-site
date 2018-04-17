import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'

import Packages from '../../api/packages/packages'
import PackageCard from './PackageCard'
import Spin from '../components/Spin'

const PackageRow = ({ name, slug, packages, isReady }) => {
  return (
    packages.length ? <div style={styles.row}>
      <h2 style={styles.title}><Link style={styles.link} to={`/${slug}`}>{name}</Link></h2>
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
    </div> : null
  )
}

export default withTracker(({ typeId }) => {
  const handle = Meteor.subscribe('packages.typeId', typeId, 6)
  const packages = Packages.find({
    type: typeId
  }, {
    sort: { createdAt: -1 },
    limit: 6
  }).fetch()
  return {
    isReady: handle.ready(),
    packages
  }
})(PackageRow)

const styles = {
  row: {
    display: 'block',
    marginBottom: 32,
    overflow: 'auto'
  },
  title: {
    fontSize: 20,
    lineHeight: '20px',
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 'normal'
  },
  link: {
    color: 'rgba(0, 0, 0, 0.85)'
  }
}
