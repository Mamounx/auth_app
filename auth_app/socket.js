const http = require('http');
const { connectdb } = require('./dbConnector');
const url = require('url');

async function socket(){

    const server = http.createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');

        const queryObject = url.parse(req.url,true).query;
        var username = queryObject.username || undefined; 
        var email = queryObject.email || undefined; 
        var password = queryObject.password || undefined; 
        const i = req.url.search('\\?');

        const loginCred = {
            "username": username,
            "email": email,
            "password": password,
        }

        console.log(`Login Credintials: ${JSON.stringify(loginCred)}`);

        if (req.url.slice(0, i) === '/api'){
            const user = connectdb(loginCred, false).then(result => {
                console.log(`Found User: ${JSON.stringify(result)}`);   
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));         
                // res.write(JSON.stringify(result));
            }).catch(err => {
                throw err
            });
        }

        if (req.url.slice(0, i) === '/api/reset'){
            console.log('Reseting Password...');
            const user = connectdb(loginCred, true).then(result => {
                console.log(`Found User: ${JSON.stringify(result)}`);   
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));         
                // res.write(JSON.stringify(result));
            }).catch(err => {
                throw err
            });
        }

    });
    server.listen(4010);
    
    console.log("Listening to port 4010...");
}

module.exports.socket = socket;


