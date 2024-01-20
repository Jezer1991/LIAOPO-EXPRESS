const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { query } = require("express");
const db = require("./db");
const multer = require('multer')
const path = require('path');
const fs = require('fs');
var url = require('url');
const dir = "../../../../../../../xampp/htdocs/";
const axios = require('axios');
const dotenv = require('dotenv');
const webpack = require('webpack');
const http = require('http');

const PORT = process.env.PORT || 3977;


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, dir + 'dbImagenes/kairos/productos')))


app.get("/status", (request, response) => {
    response.status(200).send({msg:"mensaje"})
});

app.get('/api/tests', (req, res) => {
    const sql = "SELECT " +
        " t.id as id_test," +
        " t.nombre as nombre_test," +
        " t.id_bloque," +
        " t.id_tipo_test," +
        " tt.nombre as nombre_tipo_test," +
        " b.nombre as nombre_bloque," +
        " te.nombre_corto as nombre_corto_tema," +
        " te.nombre_largo as nombre_largo_tema" +
        " FROM test t" +
        " INNER JOIN tipo_test tt on t.id_tipo_test = tt.id" +
        " INNER JOIN bloque b on b.id = t.id_bloque" +
        " INNER JOIN tema te on te.id = t.id_tema";
    db.query(sql, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server corriendo en ${PORT}`);
});
