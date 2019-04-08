'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Crear esquema producto
const StationSchema = Schema({
  name: String,
  state: String,
  description: String

})

module.exports = mongoose.model('Station', StationSchema)