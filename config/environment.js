const development = {
    name: 'development',
    asset_path: './assets',
    upload_path: './uploads',
    view_path: './views',
    session_name: 'Codeial',
    route_path: './routes',
    session_cookie_key: 'zyLRl8YQo64kA2vXttXxSkL6nH7W5nem',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',  
        port: 587,           // this is highly secure port TSL
        secure: false,        //as of now we are not using 2 factor authentication for mails hence its false
    
        // need to establish your identity against Gmail so that they track your things if something goes wrong
        // eg. in from section mail you are giving any name
        auth: {
            user: 'deepakjaiswar12098@gmail.com',
            pass: 'ofrn zprm adgr cbrp'
        }
    },

    google_client_ID:"897686259244-qvi5jovgifpakl7icte15dsff9df99p6.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_call_back_URL: "http://localhost:8000/users/auth/google/callback",
    google_passReqToCallback: true, // then "req" will be 1st argument in async function
    jwt_secret: 'VyCmvDa5vpLRe44uMvzYBFvELH3GyJzB'  // we have taken this value from randomkeygen.com

}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    upload_path: process.env.CODEIAL_UPLOAD_PATH,
    view_path: process.env.CODEIAL_VIEW_PATH,
    session_name: process.env.CODEIAL_SESSION_NAME,
    route_path: process.env.CODEIAL_ROUTE_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',  
        port: 587,           // this is highly secure port TSL
        secure: false,        //as of now we are not using 2 factor authentication for mails hence its false
    
        // need to establish your identity against Gmail so that they track your things if something goes wrong
        // eg. in from section mail you are giving any name
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },

    google_client_ID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    google_passReqToCallback: true, // then "req" will be 1st argument in async function
    jwt_secret: process.env.CODEIAL_JWT_SECRET,

}

//module.exports = development;
 module.exports = production;