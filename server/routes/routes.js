const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
  let sqlText = `SELECT * FROM todo ORDER BY status ASC`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error from db when sending get', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  let task = req.body;
  console.log('Got the following task', task);
  let sqlText = `INSERT INTO todo (task, status)
  VALUES ($1, $2);`;
  pool
    .query(sqlText, [task.task, task.status])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error from db when sending post', error);
    });
});

router.put('/:todoId', (req, res) => {
  let id = req.params.todoId;
  let status = req.body.taskStatus;
  let sqlText = ``;
  if (status === 'true') {
    sqlText = `UPDATE todo SET status='false' WHERE id=$1;`;
  } else {
    sqlText = `UPDATE todo SET status='true' WHERE id=$1;`;
  }
  pool
    .query(sqlText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error from db when sending put', error);
      res.sendStatus(500);
    });
});

router.delete('/:todoId', (req, res) => {
  let id = req.params.todoId;
  console.log('Removing task with id', id);
  let sqlText = `DELETE FROM todo WHERE id=$1;`;
  pool
    .query(sqlText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error from db when sending delete', error);
      res.sendStatus(500);
    });
});

module.exports = router;
