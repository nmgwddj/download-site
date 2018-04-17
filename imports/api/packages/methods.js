import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Packages from './packages.js'

Meteor.methods({
  'packages.add' (packageInfo) {
    check(packageInfo, Object)

    if (!this.userId) {
      throw new Meteor.Error(400, '请先登录再上传文件')
    }

    Packages.insert({
      ...packageInfo,
      author: this.userId,
      rating: 0,
      downloadTotal: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  },
  'packages.update.downloadTotal' (pkgId) {
    check(pkgId, String)

    return Packages.update(pkgId, {
      $inc: { 'downloadTotal': 1 }
    })
  }
})
