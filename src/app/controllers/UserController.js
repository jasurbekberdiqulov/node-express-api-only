const User = require('../models/User')
const ImgUser = require('../models/ImgUser')

class UserController {
  async index(req, res) {
    const { id: userId } = req.query

    const user = await ImgUser.findOne({ userId }).populate('userId')

    return res.json(user)
  }

  async store(req, res) {
    try {
      const { email } = req.body

      if (await User.findOne({ email })) {
        throw({ message: 'Usuario existe' })
      }

      const user = await User.create(req.body)

      return res.json(user)
    } catch (e) {
      if (e.user) {
        await e.user.remove()
      }

      return res.status(400).json({ error: e.message })
    }
  }
}

module.exports = new UserController()
