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
        " te.nombre_largo as nombre_largo_tema," +
        " t.tieneSubtemas as tieneSubtemas" +
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

app.get('/api/tests/:id_bloque', async (req, res) => {
    const id = req.params.id_bloque;

    const sql = "SELECT " +
        " t.id as id_test," +
        " t.nombre as nombre_test," +
        " t.id_bloque," +
        " t.id_tipo_test," +
        " tt.nombre as nombre_tipo_test," +
        " b.nombre as nombre_bloque," +
        " te.nombre_corto as nombre_corto_tema," +
        " te.nombre_largo as nombre_largo_tema," +
        " t.tieneSubtemas as tieneSubtemas" +
        " FROM test t" +
        " INNER JOIN tipo_test tt on t.id_tipo_test = tt.id" +
        " INNER JOIN bloque b on b.id = t.id_bloque" +
        " INNER JOIN tema te on te.id = t.id_tema" +
        " WHERE t.id_bloque = ? order by t.id";
    db.query(sql, id, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/test/:id_test', async (req, res) => {
    const id = req.params.id_test;
    const sql = "SELECT" +
        " t.id as id_test," +
        " t.nombre as nombre_test," +
        " t.id_bloque," +
        " b.nombre as nombre_bloque," +
        " t.id_tipo_test," +
        " tt.nombre as nombre_tipo_test," +
        " te.nombre_corto as nombre_corto_tema," +
        " te.nombre_largo as nombre_largo_tema," +
        " te.id as id_tema," +
        " t.tieneSubtemas as tieneSubtemas," +
        " t.tieneSupuesto as tieneSupuesto," +
        " s.supuesto as supuesto" +
        " FROM test t" +
        " INNER JOIN tipo_test tt on t.id_tipo_test = tt.id" +
        " INNER JOIN bloque b on b.id = t.id_bloque" +
        " INNER JOIN tema te on te.id = t.id_tema" +
        " LEFT join supuesto s on s.id_test = t.id"+
        " WHERE t.id = ?";
    db.query(sql, id, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/bloques', (req, res) => {
    const sql = "SELECT * FROM bloque where esExamen = 0";
    db.query(sql, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/allBloques', (req, res) => {
    const sql = "SELECT * FROM bloque";
    db.query(sql, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/examenes', (req, res) => {
    const sql = "SELECT * FROM bloque where esExamen = 1";
    db.query(sql, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/temas', (req, res) => {
    const sql = "SELECT t.id, t.nombre_corto, t.nombre_largo, b.id as id_bloque, b.nombre as nombre_bloque FROM tema t inner join bloque b on t.id_bloque = b.id";
    db.query(sql, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/bloque/:id_bloque', (req, res) => {
    const id = req.params.id_bloque;
    const sql = "SELECT * FROM bloque where id =?";
    db.query(sql, id, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})


app.get('/api/preguntas/:id_test', (req, res) => {
    const id = req.params.id_test;
    const sql2 = "SELECT" +
        " p.id, p.nombre," +
        " p.id_test, p.anho," +
        " a.anho as annho," +
        " p.esReserva as esReserva," +
        " p.anulada as anulada" +
        " FROM pregunta p" +
        " INNER JOIN anho a on p.anho = a.id" +
        " where id_test = ? order by p.orden";
    db.query(sql2, id, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/pregunta/:id_pregunta', (req, res) => {
    const id_pregunta = req.params.id_pregunta;
    const sql2 = "SELECT * FROM pregunta where id = ?";
    db.query(sql2, id_pregunta, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/opcion/:id_pregunta', (req, res) => {
    const id = req.params.id_pregunta;
    const sql2 = "SELECT * FROM opcion where id_pregunta = ?";
    db.query(sql2, id, async (err, result) => {
        res.send(result);
    });
})

app.get('/api/opciones/:id_test', (req, res) => {
    const id = req.params.id_test;
    const sql = "SELECT o.id as id_opcion, p.*, o.* FROM opcion o INNER JOIN pregunta p on p.id = o.id_pregunta WHERE p.id_test = ? order by o.opcion";
    db.query(sql, id, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/tema/:id_bloque', (req, res) => {
    const id = req.params.id_bloque;
    const sql = "SELECT " +
        "t.id, " +
        "t.nombre_corto, " +
        "t.nombre_largo, " +
        "t.id_bloque, " +
        "b.nombre as nombre_bloque " +
        "FROM tema t " +
        "INNER JOIN bloque b on t.id_bloque = b.id " +
        "WHERE t.id_bloque = ?";
    db.query(sql, id, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})


app.get('/api/tipoTest', (req, res) => {
    const sql = "SELECT * FROM tipo_test";
    db.query(sql, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/videos', (req, res) => {
    const sql = "SELECT * FROM video";
    db.query(sql, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.get('/api/anhos', (req, res) => {
    const sql = "SELECT * FROM anho";
    db.query(sql, async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})

app.post('/api/anho', (req, res) => {
    const anho = req.body.anho;
    const sql = "SELECT * FROM anho where anho = ?";
    db.query(sql, [anho],async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})


app.post('/api/save/bloque', (req, res) => {
    const nombre = req.body.nombre;
    const bloque = req.body.bloque;
    const esExamen = req.body.esExamen;
    const sql = "INSERT INTO bloque (nombre, bloque, esExamen) VALUES(?,?,?);";
    db.query(sql, [nombre,bloque,esExamen], async (err, result) => {
        if (!err) return res.redirect(req.body.prevPage);
        res.send(err);
    });
});

app.post('/api/save/tema', (req, res) => {
    const nombre_corto = req.body.nombre_corto;
    const nombre_largo = req.body.nombre_largo;
    const id_bloque = req.body.id_bloque;
    const sql = "INSERT INTO tema (nombre_corto, nombre_largo, id_bloque) VALUES(?,?,?);";
    db.query(sql, [nombre_corto, nombre_largo, id_bloque], async (err, result) => {
        if (!err) return res.redirect(req.body.prevPage);
        res.send(err);
    });
});

app.post('/api/save/tema2', async(req, res) => {
    const nombre_corto = req.body.nombre_corto;
    const nombre_largo = req.body.nombre_largo;
    const id_bloque = req.body.id_bloque;
    const sql = "INSERT INTO tema (nombre_corto, nombre_largo, id_bloque) VALUES(?,?,?);";
    db.query(sql, [nombre_corto, nombre_largo, id_bloque], (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
});


app.delete('/api/delete/bloque/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM bloque where id = ?";
    db.query(sql, id, async (err, result) => {
        if (err != null) res.send(result);
        res.send(err);
    });
});

app.delete('/api/delete/tema/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM tema where id = ?";
    db.query(sql, id, async (err, result) => {
        if (err != null) res.send(result);
        res.send(err);
    });
});


app.post('/api/save/test', (req, res) => {
    const nombre = req.body.nombre;
    const bloque = req.body.bloque;
    const tipoTest = req.body.tipoTest;
    const idTema= req.body.id_tema;
    const sql = "INSERT INTO test (nombre, id_bloque, id_tipo_test, id_tema) VALUES(?,?,?,?);";
    db.query(sql, [nombre, bloque, tipoTest, idTema], async (err, result) => {
        if (!err) return res.redirect(req.body.prevPage);
        res.send(err);
    });
});

app.post('/api/save/test2', async(req, res) => {
    const nombre = req.body.nombre;
    const bloque = req.body.id_bloque;
    const tipoTest = req.body.id_tipo_test;
    const idTema= req.body.id_tema;
    const sql = "INSERT INTO test (nombre, id_bloque, id_tipo_test, id_tema) VALUES(?,?,?,?);";
    db.query(sql, [nombre, bloque, tipoTest, idTema], async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
});


app.delete('/api/delete/test/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM test where id = ?";
    db.query(sql, id, async (err, result) => {
        if (err != null) res.send(result);
        res.send(err);
    });
});


app.post('/api/save/pregunta', (req, res) => {
    const nombre = req.body.nombre;
    const id_test = req.body.id_test;
    const anho = req.body.anho;
    const orden = req.body.orden;
    const anulada = req.body.anulada;
    const esReserva = req.body.esReserva;
    const sql = "INSERT INTO pregunta (nombre, id_test, anho,orden,anulada,esReserva) VALUES(?,?,?,?,?,?);";
    db.query(sql, [nombre, id_test, anho, orden,anulada, esReserva], async (err, result) => {
        if (!err) return res.redirect(req.body.prevPage);
        res.send(err);
    });
});

app.post('/api/save/pregunta2', async(req, res) => {
    const nombre = req.body.nombre;
    const id_test = req.body.id_test;
    const anho = req.body.anho;
    const orden = req.body.orden;
    const sql = "INSERT INTO pregunta (nombre, id_test, anho, orden) VALUES(?,?,?,?);";
    db.query(sql, [nombre, id_test, anho, orden], async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
});


app.delete('/api/delete/pregunta/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM pregunta where id = ?";
    db.query(sql, id, async (err, result) => {
        if (err != null) res.send(result);
        res.send(err);
    });
});


app.post('/api/save/opcion', (req, res) => {
    const opcion = req.body.opcion;
    const id_pregunta = req.body.id_pregunta;
    const opcionCorrecta = req.body.opcionCorrecta;
    const sql = "INSERT INTO opcion (opcion, id_pregunta, opcionCorrecta) VALUES(?,?,?);";
    db.query(sql, [opcion, id_pregunta, opcionCorrecta], async (err, result) => {
        if (!err) return res.redirect(req.body.prevPage);
        res.send(err);
    });
});

app.post('/api/save/opcion2', async(req, res) => {
    const opcion = req.body.opcion;
    const id_pregunta = req.body.id_pregunta;
    const opcionCorrecta = req.body.opcionCorrecta;
    const sql = "INSERT INTO opcion (opcion, id_pregunta, opcionCorrecta) VALUES(?,?,?);";
    db.query(sql, [opcion, id_pregunta, opcionCorrecta], async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
});

app.delete('/api/delete/opcion/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM opcion where id = ?";
    db.query(sql, id, async (err, result) => {
        if (err != null) res.send(result);
        res.send(err);
    });
});


app.post('/api/login', (req, res) => {
    const usuario = req.body.usuario;
    const password = req.body.password;
    const sql = " SELECT" +
    " p.nombre AS nombre_permiso," +
    " p.id AS id_permiso," +
    " u.id AS id_usuario," +
    " u.nombre AS nombre_usuario," +
    " u.password AS password_usuario," +
    " m.id AS id_menu" +
    " FROM permisos_usuarios pu" +
    " INNER JOIN permisos p on p.id  = pu.id_permiso" +
    " INNER JOIN usuario u on u.id = pu.id_usuario" +
    " INNER JOIN menu m on m.id = pu.id_menu" +
    " WHERE u.nombre = ? AND u.password = ?";

    db.query(sql, [usuario, password], async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
});

app.post('/api/save/compuesto', (req, res) => {
    const id_padre = req.body.id_padre;
    const id_hijo = req.body.id_hijo;
    const orden = req.body.orden;
    const sql = "INSERT INTO compuesto (id_padre, id_hijo,orden) VALUES(?,?,?);";
    db.query(sql, [id_padre,id_hijo, orden], async (err, result) => {
        if (!err) return res.redirect(req.body.prevPage);
        res.send(err);
    });
});


app.get('/api/compuestos/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM compuesto c inner join test t on c.id_hijo = t.id  left join supuesto s on s.id_test  = c.id_hijo where c.id_padre = ? order by c.orden asc";
    db.query(sql,id,async (err, result) => {
        if (err === null) {
            res.send({ code: 201, result });
        } else {
            res.send({ code: 202, err });
        }
    });
})


app.get('/api/supuesto/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM supuesto where id_test = ?";
    db.query(sql,id,async (err, result) => {
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
