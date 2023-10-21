const express = require('express');
const Emps = require('./emps');
const Deps = require('./deps');

const app = express.Router();

app.get('/', (_req, res) => {
    res.redirect('/emps');
});


app.get('/about', async (req, res) => {
    console.log("req made on" + req.url);
    res.render('about', { title: 'About' });
})

app.use('/emps', Emps);
app.use('/deps', Deps);

module.exports = app;
