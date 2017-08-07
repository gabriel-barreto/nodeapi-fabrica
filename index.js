//importanto os node_modules requeridos
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//importando as configurações
const dbConfig = require('./Config/dbConfig');

//importando as rotas
const userRoutes = require('./Routes/userRoutes.js');

let app = express();
let port = process.env.PORT || 5000;

mongoose.connect(dbConfig.uri);

app.use(morgan('dev'));
app.use(bodyParser.json());

//Middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, PATCH, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Routes
app.get('/api/test', function(request, response) {
    response.send({
        success: 'true',
        message: 'API Online'
    });
});

//Adicionando rotas de outro arquivo
app.use('/api/users', userRoutes);

//Iniciando serviço de API
app.listen(port, function() {
    console.log('API is Online on port: ' + port);
});