//Each todo will be linked to a specific user
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: { type: String, required: true },
    isDone: { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', todoSchema);

