const express = require('express')
const handle = require('express-async-handler')
const validate = require('express-validation')
const multerConfig = require('./config/multer')
const uploads = require('multer')(multerConfig)

const routes = express.Router()

const authMiddlewares = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))
routes.post('/users', validate(validators.User), handle(controllers.UserController.store))

// abaixo disso rotas protegidas jwt
routes.use(authMiddlewares)

routes.get('/users', handle(controllers.UserController.index))

routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post('/ads', validate(validators.Ad), handle(controllers.AdController.store))
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

routes.post('/purchase', validate(validators.Purchase), handle(controllers.PurchaseController.store))

routes.post('/upload/img', uploads.single('img'), handle(controllers.UploadController.index))

module.exports = routes
