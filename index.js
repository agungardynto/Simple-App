const express = require('express');
const database = require('nedb');
const favicon = require('serve-favicon');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const dataStore = new database('base.db');
dataStore.loadDatabase();

app.use(express.static('public'));
app.use(express.json({ limit: '1MB' }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.listen(port, () => console.log(`Server ready at port ${port}`));

app.post('/api', (req, res) => {
    console.log('new request from user');
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    dataStore.insert(data);
    res.json({
        status: 'success',
        timestamp: timestamp,
        name: data.name,
        email: data.email,
        message: data.message
    });
});
app.get('/api', (req, res) => {
    dataStore.find({}, (e, data) => {
        if (e) {
            res.end();
            return;
        } else {
            res.json(data);
        }
    });
});