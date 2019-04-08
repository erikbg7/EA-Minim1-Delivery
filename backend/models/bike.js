'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Crear esquema producto
const BikeSchema = Schema({
  name: String,
  kms: Number,
  station: String,
  description: String

})

module.exports = mongoose.model('Bike', BikeSchema)