const express    = require('express');
const exphbs     = require('express-handlebars');
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
});

//body parser 
app.use(bodyParser.urlencoded({ extended: false}));

// handle bars
app.set('views', path.join(__dirname, 'views'));

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