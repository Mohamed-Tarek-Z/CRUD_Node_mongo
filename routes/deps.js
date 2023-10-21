const express = require('express');
const Deps = require('../models/depart');

const app = express.Router();


app.get('/', async (req, res) => {
    console.log("req made on" + req.url);
    try {
        let deps = await Deps.find().sort({ createdAt: -1 });
        res.render('showDepart', { deps: deps, title: 'Departments' });
    } catch (error) {
        console.log("error", error);
    }
})


app.get('/create', (req, res) => {
    console.log("GET req made on" + req.url);
    res.render('addDepart', { title: 'Add Department' });
})

app.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let dep = await Deps.findById(id);
        res.render('detailsDep', { dep: dep, action: 'edit', title: 'Dep Details' });
    } catch (error) {
        console.log("error", error);
    }
});

app.get('/edit/:name/:action', async (req, res) => {
    console.log("req made on" + req.url);
    try {
        let name = req.params.name;
        let dep = await Deps.findOne({ name: name });
        res.render('editDepart', { dep: dep, title: 'Edit-Depart' });
    } catch (error) {
        console.log("error", error);
    }
})

app.post('/create', async (req, res) => {
    console.log("POST req made on" + req.url);
    console.log("Form submitted to server");

    try {
        const dep = new Deps(req.body);
        await dep.save();
        res.redirect('/deps');
    } catch (error) {
        console.log("error", error);
    }
})

//route for updating users data
app.post('/edit/:id', async (req, res) => {
    console.log("POST req made on" + req.url);
    try {
        await Deps.updateOne({ _id: req.params.id }, req.body);
        res.redirect('/deps');
        console.log("Deps profile Updated");
    } catch (error) {
        console.log("error", error);
    }
})


//routes for deleting users by getting users name from url then finding that  users then doing delete
app.post('/:name', async (req, res) => { //form action of details.ejs pass name of user that later is assume as name
    try {
        let name = req.params.name;
        console.log(name);
        await Deps.deleteOne({ name: name })
        res.redirect('/deps');
    } catch (error) {
        console.log("error", error);
    }
})

module.exports = app;