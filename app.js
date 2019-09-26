const express = require('express');
const Sequelize = require('sequelize');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const app = express();
const html = require('html-template-tag');
const layout = require('./views/layout');
const models = require('./models');
const wiki = require('./routes/wiki');
const users = require('./routes/users');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser(express.urlencoded({ extended: true })));

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './stylesheets/style.css')));
app.use('/wiki', wiki);
app.use('/users', users);
// app.use();

app.get('/', (req, res, next) => {
  res.send(layout());
});

app.get('/*', (req, res, send) => {
  res.redirect('/wiki');
});

// const Page = db.define('page');

models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const PORT = 3000;

const init = async () => {
  await models.User.sync();
  await models.Page.sync();
  models.db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(chalk.blue(`listening on PORT ${PORT}`));
  });
};

init();
