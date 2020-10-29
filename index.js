const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
//Import Routes
const postsRoute = require('./routes/posts');


// Env Variables
const PORT = process.env.PORT || 1111;
const HOST = process.env.HOST || 'localhost';

//MIDDLEWARE
app.use(cors())
app.use(bodyParser.json());

app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to RESTFul API' });
});

//connect to db
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.connection
    .once('open', () => console.log("Mongo Connected"))
    .on('error', (error) => console.log("Error", error))


// Server Start
app.listen(PORT, () => {
    console.log(`API Running at http://${HOST}:${PORT}/api`);
});