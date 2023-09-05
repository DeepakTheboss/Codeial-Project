// setting up express server
const express = require('express');
const app  = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

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