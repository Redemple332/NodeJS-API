const express = require('express');
const cors = require('cors');
const route = require('./middleware/user');
const app = express();
const dotenv = require("dotenv").config();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
route(app)
const port = 3000;

app.listen(port, function() {
    console.log('listening on port')
});