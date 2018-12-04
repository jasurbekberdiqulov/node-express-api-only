const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' })
  }

  const [, token] = authHeader.split(' ')

  try {
    // jwt.verify(token, authConfig.secret, function(err, decoded) {});
    // Ou
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    // armazena no req de toda requisição o userId
    req.userId = decoded.id

    return next()
  } catch (e) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
