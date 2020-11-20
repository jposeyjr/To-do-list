const express = require('express');
const app = express();
const barRouter = require('./routes/routes'); //change from bar
const port = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));


app.use('/foo', barRouter); //change foo and bar 


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});