require('dotenv').config()
const express = require('express');
const router = require('./routes');
const errHandler = require('./middlewares/errHandler.js');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errHandler);

app.listen(PORT, () => {
    console.log(`Listen to the max PORT: ${PORT}`);
})