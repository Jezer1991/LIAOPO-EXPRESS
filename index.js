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

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, dir + 'dbImagenes/kairos/productos')))


var server = app.listen(3001, () => {
    console.log("Opos-Jez running");
});


app.get("/status", (request, response) => {
   const status = {
      "Status": "Running"
   };
   
   response.send(status);
});
