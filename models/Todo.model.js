const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const todoModel = mongoose.model('todo', todoSchema);
module.exports = todoModel;