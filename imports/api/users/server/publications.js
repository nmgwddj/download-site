import { Meteor } from 'meteor/meteor'

Meteor.publish('users.current', function () {
  const userId = this.userId
  return Meteor.users.find({
    _id: userId
  }, {
    fields: { services: 0 }
  })
})

Meteor.publish('users.one', function (userId) {
  return Meteor.users.find({
    _id: userId
  }, {
    fields: {
      username: 1
    }
  })
})
