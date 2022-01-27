const dotenv = require("dotenv")
const path = require('path');
dotenv.config({path: path.resolve(__dirname, '../.env')})
const express = require('express');
const leadersRouter = require('./api/leaders');
const externalRouter = require('./api/external');

const app = express();

const { router } = require('./requestHandler.js')

const models = require('./models');

const CLIENT_PATH = path.resolve(__dirname, '../dist');

const PORT = 3000;
app.use(express.static(CLIENT_PATH));
app.use('/', router);
app.use('/api/leaders', leadersRouter);
app.use('/api/external', externalRouter);
app.listen(PORT, () => {
  console.log(`Serving listening on ${PORT}`);
})



module.exports = {
  app,
};