const express = require('express');
const env = require('./config/environment');
const cors = require('cors');
const io = require('socket.io-client');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

// Used for session-cookie to save the user_id (or any key) in encrypted form
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//including passportJwt strategy here
const passportJWT = require('./config/passport-jwt-strategy');
//including passportGoogle strategy here
const passportGoogle = require('./config/passport-google-oauth2.strategy');
// Saving session info to the db
const MongoStore = require('connect-mongo');
// used for compiling the scss or sass files into css
const sassMiddleware = require('node-sass-middleware');
// used bcs showing flash messages to UI
const flash = require('connect-flash');
const cusMware = require('./config/middleware');
const path = require('path');

 // setup the chat server to be used with socket.io
  // we are importing the http(inbuilt module) for express app
  // put on different port than 8000
  
 const chatServer = require('http').createServer(app); 
 const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
 chatServer.listen(5000);
 console.log('chat server is listning on port 5000');


// puted  this middleware to at the starting, before server gets started bcs it will precompiled 
//and availble to all the views
app.use(sassMiddleware({
  src: path.join(__dirname, env.asset_path, '/scss'), // we can put '/scss' or 'scss' works same
  dest: path.join(__dirname, env.asset_path, '/css'),
  debug: false,
  outputStyle: 'extended',
  prefix: '/css'

}));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for serving static files
app.use(express.static(env.asset_path));

// make the upload path available to browser
app.use(env.upload_path, express.static(__dirname + env.upload_path));
// Extract style and scripts from sub pages (views e.g., userProfiles.ejs, etc.)
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Before loading the views to the browser, we have to set the wrapper for different content
// i.e., for home.ejs or userProfile.ejs (variable part), we need to set the layouts (how the page is structured)
app.use(expressLayouts);

// Setting the view engine to show everything on UI
app.set('view engine', 'ejs');
app.set('views', env.view_path);

// Session configuration
app.use(
  session({
    name: env.session_name, // Name of the cookie
    secret: env.session_cookie_key, // Use a strong and unique secret key
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 20, // Expiration time in milliseconds (20 mins)
    },
    // Mongo store is used to store the cookie in the database
    
    store: new MongoStore(
      {
       // mongooseConnection: db,
        // this is newer versions 
        mongoUrl: `mongodb://127.0.0.1/${env.db}`,
        autoRemove: 'disabled',
      },
      function (err) {
        if (err) {
          console.error('Error setting up session store:', err);
        } else {
          console.log('connect-mongodb setup ok');
        }
      }
    ),
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// flash messages are stored in session-cookie hence 
//1st seesion needs be initialized the we can able to use flash
app.use(flash());
//use it after flash
app.use(cusMware.setFlash);


app.use(passport.setAuthenticatedUser);

// Use express router
app.use('/', require(env.route_path)); // It will pick the default 
//index.js route (inside the routes folder i.e., index.js)

// Server listening
app.listen(port, function (err) {  
  if (err) {
    console.log(`Error in running the server ${err}`);
    return;
  }
  console.log(`Yup! My Express server is up and running on port ${port}`);
});
