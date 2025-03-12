const express    = require('express');
const app        = express();
const db         = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
});

//body parser 
app.use(bodyParser.urlencoded({ extended: false}));

// conexao db
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err);
    });


// Rotas
app.get('/', function(req, rest){
    rest.send("Está funcionando");
})

//Rotas dos trabalhos(jobs)
app.use('/jobs', require('./routes/routes.js'));