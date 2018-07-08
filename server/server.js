
//External Libraries
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

//Internal Libraries
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Todos
//CREATE
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send({doc});
    }, (e) => {
        res.status(400).send(e);
    })
});

//READ
app.get('/todos', (req, res) => {
    Todo.find({}).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    }) 
});

//READ Specific
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    Todo.findById({_id: id}).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }

        res.send({todo});
    }).catch( (e) => res.status(400).send());
});

//UPDATE
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = true;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => res.status(400).send());

});

//DELETE
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => res.status(400).send());
});

// Users
//CREATE
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);

    user.save().then((user) => {
        var token = user.generateAuthToken();
        res.header('x-auth', token).send(user);

    }).catch((e) => res.status(404).send(e));
});

app.listen(port, () => {
    console.log(`Starting Server at port ${port}`);
});

module.exports = {app};