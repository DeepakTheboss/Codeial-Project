const development = {
    name: 'development',
    asset_path: './assets',
    upload_path: './uploads',
    view_path: './views',
    session_name: 'Codeial',
    route_path: './routes',
    session_cookie_key: 'your-secret-key',
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
    jwt_secret: 'codeial'

}

const production = {
    name: 'production'
}

module.exports = development;