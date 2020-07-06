const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const path = require('path');
const config = require('config');


const app = express();

// Bodyparser Middleware / parse application/json
app.use(express.json());

// DB Config - we nee to npm i config
const DB = config.get('mongoURI');

// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo DB Connected..."))
  .catch((err) => console.log(">>>>> Mongo DB Not-Connected >>>>>>>", +err));

// Use routes - All API From Route Folder
app.use("/api/items", require("./routes/api/items"));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assests if in production - for deploye purpose
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ));
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
