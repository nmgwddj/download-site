import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import Packages from '../../api/packages/packages'
import DetailsHeader from '../components/DetailsHeader'
import DetailsContent from '../components/DetailsContent'
import Spin from '../components/Spin'

const Details = ({ isReady, pack }) => {
  return (
    isReady ? <div><DetailsHeader pack={pack} /><DetailsContent pack={pack} /></div> : <Spin />
  )
}

export default compose(
  withRouter,
  withTracker(({ match }) => {
    const { packageId } = match.params
    const handlePackages = Meteor.subscribe('packages.one', packageId)

    return {
      isReady: handlePackages.ready(),
      pack: Packages.findOne(packageId)
    }
  })
)(Details)
