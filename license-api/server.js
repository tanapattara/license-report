var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'licensedb'
});
 
// connect to database
dbConn.connect(); 
// Retrieve all users 
app.get('/license', function (req, res) {
    dbConn.query('SELECT * FROM license', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'license list.' });
    });
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;