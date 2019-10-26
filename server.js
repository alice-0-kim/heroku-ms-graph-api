const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

const { Client } = require('pg');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/healthcheck', function (req, res) {
    return res.send('Hello, world!');
});

app.get('/candidates', function (req, res) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });

    client.connect().catch((err) => console.error(err));

    client.query('SELECT Name, Email from Candidates;', (err, data) => {
        if (err) console.error(err);
        console.log(data);
        for (let row of data.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
        return res.send(data.rows);
    });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, function () {
    console.log('\x1b[36m%s\x1b[0m', 'Listening to port ' + port + '...');
});
