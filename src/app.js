const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const routerUser = require('../routes/users.routes');
const routerMessage = require('../routes/messages.routes');
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routerUser);
app.use(routerMessage);
module.exports = app;
// const server = hottp.createServer(app)
