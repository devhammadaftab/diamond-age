const express = require("express");
const router = express.Router();

const Events = require("../models/eventsSchema")

router.get('/events', (req, res) => {
    Events.find()
        .then(response => res.json(response))
        .catch(err => res.status(400).json({ error: err }))
})

router.get('/events/:id', (req, res) => {
    Events.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(400).json({ error: err }))
})

router.get('/eventsStatus', (req, res) => {
    Events.find({downtown_event: "Yes"})
        .then(response => res.json(response.length > 0 ? "Yes" : "No"))
        .catch(err => res.status(400).json({ error: err }))
})

router.post('/events', (req, res) => {

    const newEvent = new Events(req.body);

    newEvent.save()
        .then(response => res.json(response))
        .catch(err => res.status(400).json("Error: " + err))

})

router.put('/events/:id', (req, res) => {
    Events.findByIdAndUpdate(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(400).json("Error: " + err))
})

router.delete('/events/:id', (req, res) => {
    Events.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router