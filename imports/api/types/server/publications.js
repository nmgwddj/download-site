import { Meteor } from 'meteor/meteor'
import Types from '../types.js'

const DEVELOPMENT = Meteor.isDevelopment

Meteor.publish('types.all', function () {
  if (DEVELOPMENT) Meteor._sleepForMs(500)
  return Types.find()
})
