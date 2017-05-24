import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import users from './routes/users';
import auth from './routes/auth';
import gymclasses from './routes/gymclasses';

const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/mern-booking-app');

mongoose.connection.once('open', () => {
    console.log('connected to db mongodb://localhost/mern-booking-app');
}).on('error', (error) => {
    console.log('Connection error:', error);
});

// set mongoose promise to global promise
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/gymclasses', gymclasses);

app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: "Something went wrong. Please try again later"
    }
  });
});

app.listen(8080, () => console.log('Running on localhost:8080'));
