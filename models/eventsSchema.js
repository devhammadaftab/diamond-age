const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
    domain: { type: String, required: false },
    subDomain: { type: String, required: false },
    owners: { type: Array, required: false },
    description: { type: String, required: false },
    downtown_event: { type: String, required: false }
});

const Events = mongoose.model("events", eventsSchema)

module.exports = Events