import qiniu from 'qiniu'
import { Meteor } from 'meteor/meteor'

import Global from '../../startup/server/global'

const { ACCESS_KEY, SECRET_KEY, BUCKET_NAME } = Global.qiniu

Meteor.methods({
  'getUploadToken' (saveKey) {
    const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
    const options = {
      scope: BUCKET_NAME,
      saveKey
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)

    return uploadToken
  }
})
