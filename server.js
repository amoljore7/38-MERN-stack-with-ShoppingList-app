const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Bodyparser Middleware / parse application/json
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser:true})
.then(() => console.log('>>>>>>>>>Mongo DB Connected...'))
.catch(err => console.log(">>>>>>>>>>>>",+err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));