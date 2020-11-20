const express = require('express');
const app = express();
const todoRouter = require('./routes/routes');
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('server/public'));

app.use('/todo', todoRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
