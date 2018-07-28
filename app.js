const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const controllers = require('./controllers/index')(app);

app.listen(config.app.port);