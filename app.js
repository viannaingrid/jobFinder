const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/connection');
const Job = require('./models/job.js');
const { where } = require('sequelize');

const app = express();
const port = 3000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração do Handlebars para usar .hbs
app.engine('hbs', engine({
    extname: '.hbs', 
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o banco de dados
db.authenticate()
    .then(() => console.log("Conectou ao banco com sucesso"))
    .catch(err => console.error("Ocorreu um erro ao conectar:", err));

// Rota principal
app.get('/', (req, res) => {

    let search = req.body.job;

    if(!search){

        Job.findAll({ 
            where, 
            order: [['createdAt', 'DESC']] })
        .then(jobs => {
            res.render('index', { jobs });
        }); 
    }

});

// Rotas dos trabalhos (jobs)
app.use('/jobs', require('./routes/routes.js'));

// Inicia o servidor
app.listen(port, () => console.log(`O Express está rodando na porta ${port}`));
