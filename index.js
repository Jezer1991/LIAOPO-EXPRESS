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


app.listen(PORT, () => {
    console.log(`Server corriendo en ${PORT}`);
});
