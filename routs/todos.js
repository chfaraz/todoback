const express = require('express');

const auth = require('../middleWare/auth');

//requiring Item model from models

const Todo = require('../models/Todo');

const router = express.Router();

//fetching all data

router.get('/:user', auth, (req, res) => {
    Todo.find({ userName: req.params.user })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
});

//getting specific data with id

router.get('/todo/:todoId', auth, (req, res) => {
    Todo.findById({ _id: req.params.todoId })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
});

// posting data to mongodb with mongoose

router.post('/', auth, (req, res) => {
    console.log(req.body);
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        userName: req.body.userName,
        completed: false,
    });
    todo.save()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
});

// updating route

router.patch('/:todoId', auth, (req, res) => {
    Todo.updateOne(
        { _id: req.params.todoId },
        {
            $set: {
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed,
            },
        }
    )
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json({ message: error });
        });
});

// route to delete a specific item

router.delete('/:todoId', auth, (req, res) => {
    Todo.remove({ _id: req.params.todoId })
        .then(() => res.json('deleted successfully'))
        .catch((err) => res.json(err));
});

module.exports = router;
