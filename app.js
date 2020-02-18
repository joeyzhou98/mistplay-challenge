const express = require('express');
const app = express();
const fuzzysort = require('fuzzysort')
const fs = require('fs');
const port = process.env.PORT || 8080;

// Parse data from file
const rawdata = fs.readFileSync('games.json');
const data = JSON.parse(rawdata);

// Search endpoint
app.get('/search', function(req, res) {
    const query = req.query.query;
    res.send(fuzzysort.go(query, data, {
        key: 'title',
        limit: 10
    }));
});

// Redirect any other routes to /search
app.get('/', function(req, res) {
    res.redirect("/search");
});

app.listen(port, () => console.log('Server listening on port ' + port));