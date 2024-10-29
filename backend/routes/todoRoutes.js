const express = require('express');
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');
const router = express.Router();

//middleware
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }   catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

//Fetchin all the todos
router.get('/', authenticate, async (req, res) => {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
});

//Create new user
router.post('/', authenticate, async (req, res) => {
    const { title } = req.body;
    const todo = new Todo({ userId: req.userId, title });
    await todo.save();
    res.json(todo);
});

// Update a todo
router.put('/:id', authenticate, async (req,res) => {
    const { title, isDone } = req.body;
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, { title, isDone }, { new: true });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
});

// Delete a todo
router.delete('/:id', authenticate, async (req, res) => {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
});

module.exports = router;