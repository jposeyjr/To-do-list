const express = require('express');
const router = express.Router(); 
const pool = ('../modules/pool.js');

router.get('/', (req, res) => {
    let sqlText = ``; 
    pool.query(sqlText) 
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.error('Error from db when sending get', error);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    let sqlText = ``;
    pool.query(sqlText)
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error from db when sending post', error);
    })
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let sqlText = ``; 
    pool.query(sqlText, [id]) 
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.error('Error from db when sending put', error);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id; 
    let sqlText = ``; 
    pool.query(sqlText, [id]) 
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.error('Error from db when sending delete', error);
        res.sendStatus(500);
    })
})

module.exports = router; 