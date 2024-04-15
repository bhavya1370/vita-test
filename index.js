import express from 'express';
//const express = require('express');
import bodyParser from 'body-parser';

import userRouts from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', userRouts);

app.get('/', (req, res) => res.send('Hello World!'));


app.listen(PORT, () => console.log(`Server started on port: http://localhost:${PORT}`));