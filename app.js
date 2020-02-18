const express = require('express');
const app = express();
const path = require('path');
const fuzzysort = require('fuzzysort')
const fs = require('fs');
const port = 3000;

// Serve static folder
const htmlPath = path.join(__dirname, 'frontend');
app.use(express.static(htmlPath));

// Parse data from file
const rawdata = fs.readFileSync('games.json');
const data = JSON.parse(rawdata);

app.get('/search', function(req, res) {
    const query = req.query.query;
    res.send(fuzzysort.go(query, data, {
        key: 'title',
        limit: 10
    }));
});

app.listen(port, () => console.log('Server listening on port ' + port));