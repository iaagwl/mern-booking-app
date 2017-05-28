import express from 'express';
import mongoose from 'mongoose';
import authenticate from '../middlewares/authenticate';
import validateInput from '../utils/validations/events';

import GymClass from '../models/gymclass';

const router = express.Router();

router.get('/', (req, res) => {
  GymClass.find({}, 'title date _id spots')
    .then( gymclasses => res.json({ gymclasses }))
    .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
});

router.get('/:_id', authenticate, (req, res) => {
  GymClass.findById(req.params._id)
    .then(gymclass => res.json({ gymclass }))
    .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
});

router.delete('/:_id', authenticate, (req, res) => {
  if (req.currentUser.username === 'admin'){
    GymClass.findByIdAndRemove(req.params._id)
    .then(gymclass => res.json({ gymclass }))
    .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
  } else {
    res.status(401).json({ error: 'Failed to authenticate' });
  }
});

router.post('/', authenticate, (req, res) => {
  if (req.currentUser.username === 'admin'){
    let { errors, isValid } = validateInput(req.body);

    if (isValid) {
      const { title, date, spots } = req.body;
      GymClass.create({ title, date, spots })
      .then(event => res.json({ gymclass: event }))
      .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
    } else {
      res.status(400).json({ errors });
    }
  } else {
    res.status(401).json({ errors: { global: 'Failed to authenticate' } });
  }
});

router.put('/:_id', authenticate, (req, res) => {
  console.log(req.currentUser);
  if (req.currentUser.username === 'admin'){
    let { errors, isValid } = validateInput(req.body);

    if (isValid) {
      const { title, date, spots } = req.body;
      GymClass.findByIdAndUpdate(req.params._id, { title, date, spots }, { new: true })
      .then(gymclass => res.json({ gymclass: gymclass }))
      .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
    } else {
      res.status(400).json({ errors });
    }
  } else {
    res.status(401).json({ errors: { global: 'Failed to authenticate' } });
  }
});

export default router;
