const express = require('express');
const router = express.Router();
const Job = require('../models/job.js');
const { where } = require('sequelize');

// rota de add
router.get('/add', (req, res) => {
    res.render('add.hbs');
})

// detalhe da vaga 
router.get('/view/:id', (req, res) => {
    Job.findOne({
        where: { id: req.params.id }
    })
    .then(job => {
        res.render('view', { job });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Erro ao buscar o job');
    });
});


//add job via post 
router.post('/add', (req, res) => {
    let {title, salary, company, description, email, new_job} = req.body;

    // insert 
    Job.create({
        title, 
        salary, 
        company, 
        description,
        email, 
        new_job 
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router