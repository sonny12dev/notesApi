const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config({ path: './dotenv' }); //Import dotenv new way to avoid uri parameter  must be a string error
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const cors = require('cors');

//Middlewares
app.use(bodyParser.json());
app.use(cors());
const notesRoute = require('./routes/note.route');

//Routes Middlewares
//app.use('/', (req, res) => res.send('Your online'));
app.use('/', notesRoute);

// DB Connection
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('DB Connected')
);

//Port Listening
app.listen(
    port, 
    () => console.log(`Port running in ${port}`) //This is a example of a template string
    );