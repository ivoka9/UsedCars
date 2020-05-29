const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require('./models');


const app = express();

const PORT = 4000;

app.set('view-engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.listen(PORT, function(){
    console.log(`Server is running on: ${PORT}`);
});