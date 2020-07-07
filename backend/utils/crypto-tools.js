const crypto = require('crypto')

function getRandomSalt(length) {
  return crypto.randomBytes(length)
      .toString('hex')
      .slice(0, length)
}

function SHA512(secret, salt) {
  let hash = crypto.createHmac('sha512', salt)
  hash.update(secret)
  return hash.digest('hex')
}

module.exports = {
  getRandomSalt, SHA512
}
