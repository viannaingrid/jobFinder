const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/connection');
const Job = require('./models/job.js');

const app = express();
const port = 3000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração do Handlebars para usar .hbs
app.engine('hbs', engine({
    extname: '.hbs', // Define a extensão dos arquivos como .hbs
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
app.get('/', async (req, res) => {
    try {
        const jobs = await Job.findAll({ order: [['createdAt', 'DESC']] });
        res.render('index', { jobs });
    } catch (error) {
        console.error("Erro ao buscar jobs:", error);
        res.status(500).send("Erro ao carregar os trabalhos.");
    }
});

// Rotas dos trabalhos (jobs)
app.use('/jobs', require('./routes/routes.js'));

// Inicia o servidor
app.listen(port, () => console.log(`O Express está rodando na porta ${port}`));
