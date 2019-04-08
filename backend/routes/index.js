'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const stationCtrl = require('../controllers/station')
const bikeCtrl = require('../controllers/bike')
const auth = require('../middlewares/auth')
const api = express.Router()

//RUTAS API (GET, POST, PUT, DELETE)
api.get('/product', auth, productCtrl.getProducts)
api.get('/product/:productId', auth, productCtrl.getProduct)
api.post('/product', auth, productCtrl.saveProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})


api.get('/station', stationCtrl.getStations)
api.post('/station', stationCtrl.saveStation)
api.delete('/station/:stationId', stationCtrl.deleteStation)

api.get('/bike', bikeCtrl.getBikes)
api.post('/bike', bikeCtrl.saveBike)
api.delete('/bike/:bikeId', bikeCtrl.deleteBike)




module.exports = api
