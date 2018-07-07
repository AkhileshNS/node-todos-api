
//External Libraries
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

//Internal Libraries
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req, res) => {
    Todo.find({}).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    }) 
});

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

app.listen(port, () => {
    console.log(`Starting Server at port ${port}`);
});

module.exports = {app};