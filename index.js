// setting up express server
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const app  = express();
const port = 8000;
// used for session-cookie for saving the user_id (or any key) in encrypted form
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


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


//setting the view engine to show everything on UI

app.set('view engine', 'ejs');
app.set('views', './views');

// after setting the views right this code
app.use(session({
    name: 'Codial',   // name of the cookie
    // to do change the secret before at deployment
    secret: 'blahsome',   // using this secrect key we will encrypt user.id which we set in the cookie
    saveUnInitialized: false,  // if user is not loged-in it means session is not initialized
    resave: false,  // if user is loged-in then data will be in session-cookie then no need to save data again and again
    cookie: {
        maxAge: (1000 * 60 *100)   // expiration time in milisecond
    }

}));

//telling exp app to use the passport.js 
app.use(passport.initialize());
app.use(passport.session());    // passport also helps in maintaing the session(encryption and decryption)

//use express  router
app.use('/', require('./routes')); // it will pick default index.js route(inside the routes folder i.e index.js)


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
        return;

    }
    console.log(`Yup ! My Express server is up and running on port ${port}`);
})