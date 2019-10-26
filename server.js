const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect().catch((err) => console.error(err));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/healthcheck', function (req, res) {
    return res.send('Hello, world!');
});

app.get('/candidates', function (req, res) {
    // client.query('CREATE TABLE Candidates (Name VARCHAR(255), Email VARCHAR(255) PRIMARY KEY);', (err, res) => {
    //     if (err) console.error(err);
    //     console.log('Candidates table has been created');
    // });
    // client.query('INSERT INTO Candidates (Name, Email) VALUES (\'Jane Doe\', \'jane.doe@student.com\');', (err, res) => {
    //     if (err) console.error(err);
    //     console.log('Jane Doe has been inserted into Candidates table');
    //     client.end();
    // });
    // client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    //     if (err) console.error(err);
    //     console.log(res);
    //     for (let row of res.rows) {
    //         console.log(JSON.stringify(row));
    //     }
    //     client.end();
    // });
    var candidates = [];
    client.query('SELECT Name, Email from Candidates;', (err, data) => {
        if (err) console.error(err);
        candidates = data.rows;
        for (let candidate of candidates) {
            console.log(JSON.stringify(candidate));
        }
        client.end();
        return res.send(candidates);
    });
    // return res.send([
    //     { name: 'Jane Doe', email: 'jane.doe@gmail.com', password: 'Doe2hen3' },
    //     { name: 'Jane Doe', email: 'jane.doe@gmail.com', password: 'Doe2hen3' },
    // ]);
    // return res.send(candidates);
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, function () {
    console.log('\x1b[36m%s\x1b[0m', 'Listening to port ' + port + '...');
});
