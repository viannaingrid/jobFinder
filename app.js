const express = require('express');
const app = express();
const db = require('./db/connection');

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
})


// Rotas
app.get('/', function(req, rest){
    rest.send("Está funcionando 3");
})