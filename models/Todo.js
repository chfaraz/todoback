const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model('Todos', TodoSchema);
