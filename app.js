const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000 || process.env.PORT

const dbURI = process.env.dbURI||"mongodb://mongo:27017/medical";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Database-connected"); app.listen(PORT, () => {
      console.log(`app is running on port http://localhost:${PORT}`)
    })
  })
  .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

app.use((req, res) => {
  console.log("req made on" + req.url);
  res.render('404', { title: 'NotFound' });
})


