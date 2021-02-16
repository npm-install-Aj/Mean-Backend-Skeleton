const express= require('express');
const path=require('path'); //core module
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');
const message = require('./routes/message');



 mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log("connected  to database "+config.database);
})
mongoose.connection.on('error',()=>{
    console.log("error connecting  to database "+config.database);
})
const app = express();
//port number
const port = 3000;
//use middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname,'client')));

//body parser 
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users)
app.use('/message',message)

//index  Route
app.get('/',(req,res)=>{
    res.send("Invalid endpoint");
})

//start server
app.listen(port, ()=>{
    // console.log("server started on port"+port);
})
