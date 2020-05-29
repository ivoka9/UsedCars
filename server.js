const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require('./models');
const session= require('express-session')
const store = require('connect-mongo')(session)
const controllers =require('./controllers')



const app = express();

const PORT = 4000;

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    store: new store({        
    url: "mongodb://127.0.0.1:27017/usedcars",      
    }),
    secret:"ivo",
    resave:false,
    saveUninitialized: false,
    cookie:{ maxAge: 1000*60*60*24*7},
}))

//app.use('/',controllers.user)
app.use('/cars',controllers.car);
app.listen(PORT, function(){
    console.log(`Server is running on: ${PORT}`);
});
