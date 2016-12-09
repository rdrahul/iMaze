var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var mainRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var config = require('./config');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//connect to database
const PORT = process.env.PORT || config['PORT'] || 8000 ;
const DB = config['MONGO_URL']['development'];
mongoose.connect(DB , function(err){
    if (err){
        return err;
    }
    else{
        console.log("Succesfully connected to " + DB);
    }
});

//routes
app.use('/',mainRouter);
app.use('/api', apiRouter);


//static files
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
app.engine('html' , require('ejs').renderFile);
app.use(express.static(path.join(__dirname , 'client')));

//roll the server
app.listen( PORT , function(){
    console.log("listening to port : " + PORT);
})



process.on('uncaughtException', function(err){
  console.error('uncaughtException: ' + err.message);
});