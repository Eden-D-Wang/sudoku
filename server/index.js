const bodyParser = require('body-parser');
const express = require('express');
const formidable = require('formidable');
const http = require('http');
const app = express();

app.use(bodyParser.urlencoded());

app.post('/sudoku', function (req, res) {
    const form = new formidable();
    form.uploadDir = 'sudoku/';
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        res.send();
    });
});

const server = http.createServer();
server.on('request', app);
server.listen(8022, '172.31.161.35', function () {
    console.log('Listening on ' + server.address().port);
});