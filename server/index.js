const dotenv = require("dotenv")
const path = require('path');
dotenv.config({path: path.resolve(__dirname, '../.env')})
const express = require('express');
const app = express();

const { router } = require('./requestHandler.js')

const models = require('./models');

const CLIENT_PATH = path.resolve(__dirname, '../dist');

// const init = async () => {
//   await models.sync({force: true}) // force true will drop the table if it already exists
//   console.log('Tables have synced!')
// }

// init()


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Serving listening on ${PORT}`);
})

app.use(express.static(CLIENT_PATH));
app.use('/', router);

module.exports = {
  app,
};