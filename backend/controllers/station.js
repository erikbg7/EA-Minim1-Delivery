'use strict'

const Station = require('../models/station')


/*"Url a la que queremos que escuche este método,
Devuelve un callback con las dos variables petición y respuesta */
function getStations (req, res) {
  Station.find({}, (err, stations) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
    if (!stations) return res.status(404).send({message: 'No existe esta estación'})

    //Finalizar petición y comprobar que funciona
    res.send(200, { stations })
  })
}

function getStation (req,res) {
  let stationID = req.params.stationID

  Product.findById(stationID, (err, station) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
    if (!station) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({ station })
  })
}


function saveStation (req, res) {
  console.log('POST /api/product')
  console.log(req.body) //Mostrar todo el cuerpo (body)

  let station = new Station()
  station.name = req.body.name
  station.state = req.body.state
  station.description = req.body.description

  station.save((err, stationStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la BBDD: ${err}`})

    res.status(200).send({station: stationStored})
  })
}


function deleteStation (req, res) {
  let stationId = req.params.stationId

  Station.findById(stationId, (err, station) => {
    if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})

    station.remove(err => {
      if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})

      res.status(200).send({message: `Station deleted`})
    })
  })
}


module.exports = {
  getStations,
  getStation,
  saveStation,
  deleteStation
}
