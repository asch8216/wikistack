const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const { Page, User } = require('../models');
// const { User } = reqyure("../")

router.get('/', async (req, res, next) => {
  res.send('hello');
});

router.post('/', async (req, res, next) => {
  const regex = / /g;
  let str = req.body.title;
  let newStr = str.replace(regex, '_');

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    slug: newStr
  });

  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  console.log('page', page);
  console.log('user', user);

  try {
    await page.save();
    await user.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
