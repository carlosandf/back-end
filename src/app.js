const express = require('express');
const cors = require('cors');
const mongoDbConnect = require('./mongo.js');
const errorHandle = require('./middlewares/errorHandle.js')
const notFound = require('./middlewares/notFound.js');
const clientsRouter = require('./controllers/clients.js')
const app = express();

// Connection to DB
mongoDbConnect();

app.use(cors());
app.use(express.json());
// app.use(requestLogger);

app.use(express.static('public'))
app.use('/api/clients', clientsRouter);

// ERROR RESPONSE
app.use(errorHandle);

// NOT FOUND
app.use(notFound);

module.exports = app;