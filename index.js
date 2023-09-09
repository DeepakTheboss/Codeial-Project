// setting up express server
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const app  = express();
const port = 8000;

app.use(express.urlencoded()); // parssing the form data
app.use(cookieParser()); // telling to app to use the cookie parser



// static file location or setup access
app.use(express.static('./assets'));

//extract style and scripts from sub pages(views eg userProfiles.ejs etc..)
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// before loading the views to the browser we have to set the wrappper for different content 
//i.e for home.ejs or userProfile.ejs (variable part), we need to set the layouts(how page is structured)
app.use(expressLayouts);

//use express  router
app.use('/', require('./routes')); // it will pick default index.js route(inside the routes folder i.e index.js)

//setting the view engine

app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
        return;

    }
    console.log(`Yup ! My Express server is up and running on port ${port}`);
})