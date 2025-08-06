const express = require("express");

const app = express();

app.use((req, res) => {
    res.json({ mensaje: "todo funciona como debería" });
});

module.exports = app;
