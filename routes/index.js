const express = require('express');
const Emps = require('../models/employee');
const Deps = require('../models/depart');

const app = express.Router();

app.get('/', (_req, res) => {
    res.redirect('/emps');
});


app.get('/about', async (req, res) => {
    console.log("req made on" + req.url);
    res.render('about', { title: 'About' });
})

app.get('/emps', async (req, res) => {
    console.log("req made on" + req.url);
    try {
        let emps = await Emps.find().sort({ createdAt: -1 });
        res.render('index', { emps: emps, title: 'Home' });
    } catch (error) {
        console.log("error", error);
    }
})


app.get('/emp/create', async (req, res) => {
    console.log("GET req made on" + req.url);
    try {
        let deps = await Deps.find().sort({ createdAt: -1 });
        res.render('addemp', { deps: deps, title: 'Add-Emp' });
    } catch (error) {
        console.log("error", error);
    }
})


app.get('/emps/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let emp = await Emps.findById(id).populate('department');
        res.render('details', { emp: emp, action: 'edit', title: 'Emp Details' });
    } catch (error) {
        console.log("error", error);
    }
});

app.get('/edit/:name/:action', async (req, res) => {
    console.log("req made on" + req.url);
    try {
        let name = req.params.name;
        let deps = await Deps.find().sort({ createdAt: -1 });
        let emp = await Emps.findOne({ name: name });
        res.render('edit', { emp: emp, deps: deps, title: 'Edit-Emp' });
    } catch (error) {
        console.log("error", error);
    }
})


app.post('/emp/create', async (req, res) => {
    console.log("POST req made on" + req.url);
    console.log("Form submitted to server");

    try {
        const emp = new Emps(req.body);
        await emp.save();
        res.redirect('/emps');
    } catch (error) {
        console.log("error", error);
    }
})

//route for updating users data
app.post('/edit/:id', async (req, res) => {
    console.log("POST req made on" + req.url);
    try {
        await Emps.updateOne({ _id: req.params.id }, req.body);
        res.redirect('/emps');
        console.log("Emps profile Updated");
    } catch (error) {
        console.log("error", error);
    }
})


//routes for deleting users by getting users name from url then finding that  users then doing delete
app.post('/emps/:name', async (req, res) => { //form action of details.ejs pass name of user that later is assume as name
    try {
        let name = req.params.name;
        console.log(name);
        await Emps.deleteOne({ name: name })
        res.redirect('/emps');
    } catch (error) {
        console.log("error", error);
    }
})

module.exports = app;
