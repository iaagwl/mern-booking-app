import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import commonValidations from '../validations/signup';
import isEmpty from 'lodash/isEmpty';

import User from '../../models/user';

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
        errors.username = data.username + 'already exists';
      }
      if (user[0].email === data.email) {
        errors.email = data.email + 'already exists';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
}

const adminUserDetails = {
  username: 'admin',
  email: 'admin@admin.admin',
  password: 'admin',
  passwordConfirmation: 'admin',
  errors: { username: '', email: '' }
}

export default function adminInit() {
  validateInput(adminUserDetails, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, email, _id } = adminUserDetails;
      const password_digest = bcrypt.hashSync(password, 10);
      new User({
        username: username, email: email, password_digest: password_digest
      }).save()
      .then(user => console.log('admin user created'))
      .catch(err => console.log('Error while creating Admin user', err));
    }
  });
}
