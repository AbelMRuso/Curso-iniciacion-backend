const express = require("express");

const app = express();

app.use(express.json());

const Thing = require("./models/thing");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.post("/api/stuff", (req, res, next) => {
    delete req.body._id; //borra el id enviado por el front para substituirlo por el que se creará automáticamente en el back
    const thing = new Thing({
        ...req.body,
    });
    thing
        .save() //guarda los datos del objeto Thing
        .then(() => res.status(201).json({ message: "Objet enregistré !" }))
        .catch((error) => res.status(400).json({ error }));
});

app.put("/api/stuff/:id", (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // updateOne actualiza el objeto cuyo id se corresponde con el id de la url
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/stuff/:id", (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
});

app.get("/api/stuff/:id", (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) // findOne busca únicamente el objeto cuyo _id coincida con el id de la url
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }));
});

app.get("/api/stuff", (req, res, next) => {
    Thing.find() //busca todos los documentos de la colección asociada al modelo thing en mongoDB
        .then((things) => res.status(200).json(things)) // si  los encuentra los devuelve como respuesta en formato json
        .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
