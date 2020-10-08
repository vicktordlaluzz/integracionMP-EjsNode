require('dotenv').config();
const path = require('path');
const morgan = require('morgan');

const express = require('express');
const cors = require('cors');

const routingModule = require('./routes/routingModule');



// Crear el servidor de express
const app = express();

// Configuracion CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.use('/', routingModule);
app.use(express.static(path.join(__dirname, 'public')));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})