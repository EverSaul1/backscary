const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

console.log(process.env)
// crear el servidor de express
const app = express();

//BASE DE DATOS
dbConnection();
//DIRECTORIO PUBLICO

app.use(express.static('public'))

//CORS
app.use(cors());

//LECTURA Y PARSEO DEL BODY

app.use(express.json());

//RUTAS
app.use( '/api/auth', require('./routes/auth'));
app.use( '/api/category', require('./routes/category'));
app.use( '/api/history', require('./routes/history'));
app.use( '/api/myHistory', require('./routes/myHistory'));
app.use( '/api/ranking', require('./routes/ranking'));



app.listen(process.env.PORT, ()=> {
    console.log(`servidor corriendo el puerto ${process.env.PORT}`)
})