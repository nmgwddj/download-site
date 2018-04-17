import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import Packages from '../packages.js'

const DEVELOPMENT = Meteor.isDevelopment

Meteor.publish('packages.all', function (searchTerm, limit) {
  check(searchTerm, Match.OneOf(String, null, undefined))
  check(limit, Number)

  const query = {}

  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i')
    Object.assign(query, {
      title: regex
    })
  }

  return Packages.find(query, {
    limit,
    sort: { createdAt: -1 }
  })
})

Meteor.publish('packages.typeId', function (typeId, limit = 6) {
  check(typeId, String)
  check(limit, Match.OneOf(Number, null, undefined))

  if (DEVELOPMENT) Meteor._sleepForMs(500)

  return Packages.find({
    type: typeId
  }, {
    limit,
    sort: { createdAt: -1 }
  })
})

Meteor.publish('packages.one', function (packageId) {
  check(packageId, String)

  if (DEVELOPMENT) Meteor._sleepForMs(500)

  return Packages.find(packageId)
})

Meteor.publish('packages.pagination', function (typeId, searchTerm, currentPage = 1, pageSize = 24) {
  check(typeId, Match.OneOf(String, null, undefined))
  check(searchTerm, Match.OneOf(String, null, undefined))

  const query = {}

  const projection = {
    skip: (currentPage - 1) * pageSize,
    limit: pageSize,
    sort: { createdAt: -1 }
  }

  // 根据是否传递分类数据决定检索的分类类型
  // 为 null 则检索所有类型的数据，用于首页搜索
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

  return Packages.find(query, projection)
})
