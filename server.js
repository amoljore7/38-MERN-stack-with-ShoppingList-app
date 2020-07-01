const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const items = require('./routes/api/items');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Bodyparser Middleware / parse application/json
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true,})
.then(() => console.log('Mongo DB Connected...'))
.catch(err => console.log(">>>>> Mongo DB Not-Connected >>>>>>>",+err));

// Use routes
app.use('/api/items', items);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});