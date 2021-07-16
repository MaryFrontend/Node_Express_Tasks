const express = require('express');

const app = express();
const jsonParser = express.json();

app.get('/',function(req,res){
    res.status(200);
    res.send("<h1>Some message</h2>");
});

module.exports = app;


