import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import commonValidations from '../utils/validations/signup';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';

const router = express.Router();


function validateInput(data, otherValidations) {

  let { errors } = otherValidations(data);

  return User.find({
    $or: [
      {username: data.username},
      {email: data.email}
    ]
  })
  .then(user => {
    if (user.length) {
      if (user[0].username === data.username) {
        errors.username = 'Sorry, username has been taken';
      }
      if (user[0].email === data.email) {
        errors.email = 'Email is already registered';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
}

router.get('/:identifier', (req, res) => {
  User.find({
    $or: [
      {username: req.params.identifier},
      {email: req.params.identifier}
    ]
  }, 'username email').then( user => {
    res.json({ user });
  });
});

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, email } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);
      new User({
        username: username, email: email, password_digest: password_digest
      }).save()
      .then(user => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }));
    } else {
      res.status(400).json(errors);
    }
  });

});

export default router;
