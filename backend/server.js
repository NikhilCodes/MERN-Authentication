const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const uuid_v1 = require('uuid').v1
const cryptoTools = require('./utils/crypto-tools')
const {UserAuthModel, UserDetailModel} = require("./utils/models");

mongoose.connect(
    "mongodb://127.0.0.1:27017/userAuthDemo",
    {useUnifiedTopology: true, useNewUrlParser: true}
)
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send("Auth API")
})

app.post('/login', (req, res) => {
  let email = req.body.email
  let _salt = ''
  let _hash = ''
  let _inputHash = ''
  UserAuthModel.findOne({email}).exec((err, _userAuth) => {
    if (err) {
      res.status(400).json({
        status: "FAILED",
        error: err,
      })
    } else {
      _salt = _userAuth.salt
      _hash = _userAuth.hash
      _inputHash = cryptoTools.SHA512(req.body.password, _salt)
      if (_hash === _inputHash) {
        let _id = _userAuth._id
        UserDetailModel.findById(_id).exec((err, user) => {
          res.status(200).json({
            status: "SUCCESS",
            user
          })
        })
      } else {
        res.status(200).json({
          status: "FAILED",
          description: "INCORRECT PASSWORD!"
        })
      }
    }
  })


})

app.post('/register', (req, res) => {
  let uid = uuid_v1()
  let email = req.body.email
  let username = req.body.username
  let salt = cryptoTools.getRandomSalt(16)
  let hash = cryptoTools.SHA512(req.body.password, salt)

  let instance = new UserAuthModel({
    _id: uid,
    email,
    hash,
    salt,
  })

  instance.save((err, userAuth) => {
    if (err) {
      res.status(405).json({
        status: "FAILED"
      })
    } else {
      new UserDetailModel({
        _id: uid,
        username,
        email,
      }).save((err, userDetails) => {
        if (err) {
          res.status(405).json({
            status: "FAILED"
          })
        } else {
          res.status(200).json({
            status: "SUCCESS",
            user: userDetails
          })
        }
      })
    }
  })




})

app.listen(5000)