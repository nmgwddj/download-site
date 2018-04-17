import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { Row, Col } from 'antd'

import UploadForm from '../components/UploadForm'
import Packages from '../../api/packages/packages'
import Spin from '../components/Spin'

const Upload = ({ isEdit, isReady, pack }) => {
  return (
    <Row>
      <Col span={18} offset={3}>
        { isEdit ? isReady ? <UploadForm isEdit={isEdit} pack={pack} /> : <Spin /> : <UploadForm />}
      </Col>
    </Row>
  )
}

export default compose(
  withRouter,
  withTracker(({ history, user, match }) => {
    const { packageId } = match.params
    const handle = Meteor.subscribe('users.current')
    if (handle.ready() && !user) {
      history.push('/')
    }

    if (packageId) {
      const handlePackage = Meteor.subscribe('packages.one', packageId)
      return {
        isReady: handlePackage.ready(),
        isEdit: packageId !== undefined,
        pack: Packages.findOne(packageId)
      }
    } else {
      return {}
    }
  })
)(Upload)
