const mongoose = require('mongoose');
// setting up multer
const multer = require('multer');
const path = require('path');
// converts '/uploads/users/avatars' string to path using path module
const AVATAR_PATH = path.join('/uploads/users/avatars'); 
//const AVATAR_OLD_PATH = path.join('/uploads/users/avatars'); 



const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required: true
    },
    // key: value
    // key as avatar in db and value as path= '/uploads/users/avatars'
    avatar: {
        type:String
    }
}, {

    timestamps: true
});

// for linking our avatar as key to AVATAT_PATH as a value , we need a storage 
// where we are storing our avatar means profile picture to destination and
// what exactly will be filename 
// here if multiple user save the filename by same name then how we will difference, ans is  using epoch
// time convertor in milli second(ms) using Date.now()

// thee object contains two keys 1. destination and filename
// destination ==> contains file which comes with the request(req) and a callback function (cb)
// in the cb of destination we have relative path where the file is being stored
// __dirname means current directory name where the user.js is present that is models
// (..) this means going above users.js one level up the model and its neabour that is uploads
// now we will join the AVATAR_PATH ==> path.join('/uploads/users/avatars')

// 2nd key  filename 
// file.fieldname --> file => every file which i will upload 
// fieldname --> avatar .   so everyfile that i will upload in the avatar field for every user that will be stored as
// avatar - Date.now() --> avatar - 1234568798989  like this
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  // as above we have define the storage now we will use this storage
  
  // defining static methods so that path can be available publiclly
  //static function are the one that can be called  over whole class for example if there is class planet
  //and we want count of each planet then we will define the static class over every class and not in individual class
  // so we are defining static function over userSchema

  // multer({storage: storage}) --> this attaches the diskstorage on multer in the storage property
  // single('avatar') --> we are uploading a single file for the field name avatar i can send array of files also
  // User.uploadedAvatar --> modelname.staticfunction --> this will be available publically i.e means anyone can access
  // AVATAR_PATH = path.join('/uploads/users/avatars') ==> avatarPath --> need to be available publically of user model
  // whenever i want to access from the controller it(avatarPath) need to tell where the file is stored
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;


const User  = mongoose.model('User', userSchema);
module.exports = User;