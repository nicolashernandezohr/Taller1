const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.static('public'));

app.use(express.json());

app.use('/user',require('./routes/user'));

//app.use('/user',require('./routes/user'));

app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
})

module.exports = app;