import express from 'express';
import mongoose from 'mongoose';
import authenticate from '../middlewares/authenticate';
import validateInput from '../utils/validations/events';

import GymClass from '../models/gymclass';

const router = express.Router();


router.get('/', (req, res) => {
  GymClass.find({}, 'title date _id spots maxspots')
    .then( gymclasses => res.json({ gymclasses }))
    .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
});

router.get('/:_id', authenticate, (req, res) => {
  if (req.currentUser.username === 'admin'){
    GymClass.findById(req.params._id)
      .then(gymclass => res.json({ gymclass }))
      .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
  } else {
    res.status(401).json({ error: 'Failed to authenticate' });
  }
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
      GymClass.create({ title, date, spots, maxspots: spots })
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
  if (req.currentUser.username === 'admin'){
    let { errors, isValid } = validateInput(req.body);

    if (isValid) {
      const { title, date, spots } = req.body;
      GymClass.findByIdAndUpdate(req.params._id, { title, date, maxspots: spots }, { new: true })
        .then(gymclass => {
          GymClass.findByIdAndUpdate(req.params._id, {spots: gymclass.maxspots - gymclass.attendees.length }, { select: 'title date spots maxspots', new: true })
            .then(gymclass => {
              res.json({ gymclass: gymclass });
            })
            .catch(err => res.status(500).json({ errors: { global: "Something went wrong1"}}));
        })
        .catch(err => res.status(500).json({ errors: { global: "Something went wrong2" }}));
    } else {
      res.status(400).json({ errors });
    }
  } else {
    res.status(401).json({ errors: { global: 'Failed to authenticate' } });
  }
});

router.put('/apply/:_id', authenticate, (req, res) => {
  GymClass.findById(req.params._id)
    .then(gymclass => {
      if (gymclass) {
        let { spots, attendees, maxspots } = gymclass;
        // check if user already registerd for this class
        if (!attendees.find(item => item._id.equals(req.currentUser._id))){
          if (maxspots - attendees.length < 1) {
            res.status(403).json({ errors: { global: 'The class is full' }});
          } else {
            GymClass.findByIdAndUpdate(req.params._id, {
              $push: { "attendees": {_id: req.currentUser._id, username: req.currentUser.username, email: req.currentUser.email}},
              spots: maxspots - attendees.length - 1
            }, {select: 'title date spots maxspots', new: true })
            .then(gymclass => {
              console.log(gymclass);
              res.json({ gymclass: gymclass });
            })
            .catch(err => res.status(500).json({ errors: { global: "Something went wrong"}}));
          }
        } else {
          res.status(403).json({ errors: { global: 'You have already registered to this class'}});
        }
      } else {
        res.status(404).json({ errors: { global: "Class not found" }});
      }
    })
    .catch(err => res.status(500).json({ errors: { global: "Something went wrong" }}));
});

export default router;
