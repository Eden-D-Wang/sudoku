const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const http = require('http');
const childProcess = require('child_process');
const app = express();

const runPy = (filename) => new Promise((resolve, reject) => {
    const process = childProcess.spawn('python', ['../SnapSudoku/sudoku.py', filename]);
    process.stdout.on('data', (data) => {
        console.log(data.toString());
        resolve();
    });

    process.stderr.on('data', (data) => {
        console.error(data.toString());
        reject();
    });
});

app.post('/sudoku', function (req, res) {
    const form = new formidable();
    form.uploadDir = '../SnapSudoku/';
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        runPy(files.file.name).then(() => fs.unlinkSync(files.file.path));
        res.send(files.file.name);
    });
});

const server = http.createServer();
server.on('request', app);
server.listen(8022, '172.31.161.35', function () {
    console.log('Listening on ' + server.address().port);
});