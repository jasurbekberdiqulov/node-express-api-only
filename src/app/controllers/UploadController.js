const ImgUser = require('../models/ImgUser')

class UploadController {
  async index(req, res) {
    const { filename } = req.file

    const imgUser = await ImgUser.create({ filename, userId: req.userId })

    return res.json(imgUser)
  }
}

module.exports = new UploadController()
