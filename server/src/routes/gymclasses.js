import express from 'express';
import mongoose from 'mongoose';
import authenticate from '../middlewares/authenticate';
import validateInput from '../utils/validations/events';

import GymClass from '../models/gymclass';

const router = express.Router();

router.get('/', (req, res) => {
  GymClass.find({}, 'title date _id').then( gymclasses => {
    res.json({ gymclasses });
  });
});

router.get('/:_id', (req, res) => {
  GymClass.findById(req.params._id).then(gymclass => {
    res.json({ gymclass })
  });
});

router.post('/', authenticate, (req, res) => {
  let { errors, isValid } = validateInput(req.body);

  if (isValid) {
    const { title, date } = req.body;
    GymClass.create({ title, date })
    .then(event => res.json({ gymclass: event }))
    .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
  } else {
    res.status(400).json({ errors });
  }
});

export default router;
