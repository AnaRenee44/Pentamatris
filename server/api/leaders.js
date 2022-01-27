const express = require('express');
const leadersRouter = express.Router();
const { Users } = require('../models');

leadersRouter.get('/', (req, res) => {
  Users.findAll({
    attributes: ['username', 'high_score']
  })
  .then((data) => {
    // console.log(data, 23);
    const scores = data.map((user) => user.dataValues);
    // console.log(scores, 31);

    const sortedScores = scores.sort((a, b) => b.high_score - a.high_score);
    // console.log(sortedScores, 33);

    const top5 = sortedScores.slice(0, 5);
    res.status(200).send(top5);
  })
  .catch(err => console.log('Failed get request to /leaders', err));
});

module.exports = leadersRouter;