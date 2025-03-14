const express = require('express');
const router = express.Router();
const Job = require('../models/job.js');
const { where } = require('sequelize');

router.get('/test', (req, res) => {
    res.send('deu certo');
})



// rota de envio
router.get('/add', (req, res) => {
    res.render('add');
})

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