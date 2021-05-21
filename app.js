const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();

const todosRoute = require('./routs/todos');
const userRoute = require('./routs/users');

//middleware::::::::::::::::

// cors for cross domain access
app.use(cors());

// parsing data to jason formate
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/todos', todosRoute);
app.use('/user', userRoute);

app.get('/', auth, (req, res) => {
    res.json('hello world');
});

// connecting to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db');
});

// starting server
app.listen(3000, () => console.log('listining to 4000'));

//mongodb+srv://faraz:<password>@cluster0.6emix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
