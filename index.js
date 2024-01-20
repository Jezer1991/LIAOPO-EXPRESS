const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3977;



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/status", (request, response) => {
    response.status(200).send({msg:"mensaje"})
});


app.listen(PORT, () => {
    console.log("Opos-Jez running");
});
