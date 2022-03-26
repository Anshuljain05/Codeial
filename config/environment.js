const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ajpikachu2001',
            pass: '05@JPikachu'
        }
    },
    google_client_id: "326106355538-4emu9np2js7rkildft53kdk0vlsoqvgk.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan : {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CodeialAssetPath,
    session_cookie_key: process.env.CodeialSessionCookieKey,
    db: process.env.CodeialDb,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CodeialSMTPAuthUser,
            pass: process.env.CodeialSMTPAuthPwd
        }
    },
    google_client_id: process.env.CodeialGoogleClientId,
    google_client_secret: process.env.CodeialGoogleClientSecret,
    google_call_back_url: process.env.CodeialGoogleCallBackURL,
    jwt_secret: process.env.CodeialJWTSecret,
    morgan : {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

console.log(process.env.CodeialAssetPath);
// console.log(process.env.CodeialEnvironment);
// module.exports = development;
module.exports = eval(process.env.CodeialEnvironment == undefined ? development : eval(process.env.CodeialEnvironment));