const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt')
const { Users} = require('../models');
const sequelize = require('sequelize');

router.get('/login', (req, res) => {

});

router.get('/register', (req, res) => {

});

router.post('/login', (req, res) => {
  console.log(req.body);
});

router.post('/register', async function(req, res){
  const { password , username , email } = req.body

  try {
    const hashedP = await bcrypt.hash(password, 10);
    await Users.create({
      username: username,
      password: hashedP,
      email: email
    });
    console.log('success');
    //  res.redirect('/');
  } catch {
    console.error();
    // res.redirect('/register');
  }
});

module.exports = {
  router
};