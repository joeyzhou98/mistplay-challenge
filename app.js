const express = require('express');
const app = express();
const path = require('path');
const fuzzysort = require('fuzzysort')
const fs = require('fs');
const port = 3000;

const rawdata = fs.readFileSync('games.json');
const data = JSON.parse(rawdata);

app.get('/search', function(req, res) {
    const query = req.query.query;
    res.send(fuzzysort.go(query, data, {
        key: 'title',
        limit: 10
    }));
});

app.get('/', (req, res) =>  res.sendFile(path.join(__dirname + '/index.html')));

app.listen(port, () => console.log('Server listening on port ' + port));