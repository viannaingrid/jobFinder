const express    = require('express');
const { engine } = require('express-handlebars');
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyparser = require('body-parser');

const port = 3000;

app.listen(port, function(){
    console.log(`o express está rodando na porta ${port}`);
});

//body parser 
app.use(bodyparser.urlencoded({ extended: false}));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({defaultlayout: 'main' }));
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// conexao db
db
    .authenticate()
    .then(() => {
        console.log("conectou ao banco com sucesso");
    })
    .catch(err => {
        console.log("ocorreu um erro ao conectar", err);
    });


// rotas
app.get('/', function(req, rest){
    rest.render('index');
})

//rotas dos trabalhos(jobs)
app.use('/jobs', require('./routes/routes.js'));