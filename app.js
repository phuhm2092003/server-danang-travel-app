const express = require('express')
const bodyParser = require('body-parser')
const locationDB = require('./database/LocationDB.js')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/location/getLocations', (req, res) => {
    const { idUser } = req.body;
    locationDB.getLocations(idUser, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500)
        }

        res.status(200).json(data)
    })
})

app.post('/api/location/getFavouriteLocations', (req, res) => {
    const { idUser } = req.body;
    locationDB.getFavouriteLocations(idUser, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500)
        }

        res.status(200).json(data)
    })
})

app.post('/api/location/removeFavouriteLocation', (req, res) => {
    const { idUser, idLocation } = req.body;
    locationDB.removeFavouriteLocation(idUser, idLocation, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500)
        }

        return res.status(200).json(data)
    })
})

app.post('/api/location/addFavouriteLocation', (req, res) => {
    const { idUser, idLocation } = req.body;
    locationDB.addFavouriteLocation(idUser, idLocation, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500)
        }

        return res.status(200).json(data)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})