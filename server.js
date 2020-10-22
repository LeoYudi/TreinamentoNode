//()=>{} -> se refere ao escopo de onde foi CHAMADO
//function(){} -> se refere ao escopo de onde foi CRIADO
require('dotenv').config();

const express = require('express');
const app = express();
const bp = require('body-parser');

const LinkModel = require('./domain/model/link');
const mailer = require('./domain/mailer');

app.use(bp.json());

app.get('/', (req, res) => {
  return res.send({ oie: "hello" });
})

const port = process.env.PORT || 3333;
app.listen(process.env.PORT || 3333, () => {
  console.log(`listening on port ${port}`);
});

require('./infrastructure/database/mongodb')();

app.post('/add', (req, res) => {
  const { url, slug } = req.body;
  LinkModel.create({ slug: slug, url: url });
  res.send({ status: 200 });
});

app.get('allSlugs', (req, res) => {
  const links = LinkModel.find({});
  res.send(links);
});

app.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const link = LinkModel.findOne({ slug: slug });
  res.redirect(link.url);
});

app.post('/email', (req, res) => {
  const { emails, subject, text } = req.body;
  mailer(emails, subject, text);
  res.send({ msg: 'ok' });
});