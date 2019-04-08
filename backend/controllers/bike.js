'use strict'

const Bike = require('../models/bike')


/*"Url a la que queremos que escuche este método,
Devuelve un callback con las dos variables petición y respuesta */
function getBikes (req, res) {
  Bike.find({}, (err, bikes) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
    if (!bikes) return res.status(404).send({message: 'There are no bikes'})

    //Finalizar petición y comprobar que funciona
    res.send(200, { bikes })
  })
}




function saveBike (req, res) {

  let bike = new Bike()
  bike.name = req.body.name
  bike.kms = req.body.kms
  bike.station = req.body.station
  bike.description = req.body.description

  bike.save((err, bikeStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la BBDD: ${err}`})

    res.status(200).send({bike: bikeStored})
  })
}


function deleteBike (req, res) {
  let bikeId = req.params.bikeId

  Bike.findById(bikeId, (err, bike) => {
    if (err) res.status(500).send({message: `Error al eliminar: ${err}`})

    bike.remove(err => {
      if (err) res.status(500).send({message: `Error al eliminar: ${err}`})

      res.status(200).send({message: `Bike deleted`})
    })
  })
}


module.exports = {
  getBikes,
  saveBike,
  deleteBike
}