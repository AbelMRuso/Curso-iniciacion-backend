const mongoose = require("mongoose");

// en este esquema no metemos el campo "id" porque mongoose lo genera automáticamente

const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model("Thing", thingSchema);
