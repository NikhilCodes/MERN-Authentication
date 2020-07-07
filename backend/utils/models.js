const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserAuthSchema = new Schema({
  _id: {type: String},
  email: {type: String},
  hash: {type: String},
  salt: {type: String}
}, {collection: 'user-auth'})

const UserDetailSchema = new Schema({
  _id: {type: String},
  username: {type: String},
  email: {type: String},
}, {collection: 'user-details'})

const UserAuthModel = mongoose.model('UserAuthModel', UserAuthSchema)
const UserDetailModel = mongoose.model('UserDetailModel', UserDetailSchema)

module.exports = {
  UserAuthModel, UserDetailModel
}
