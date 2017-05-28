import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.title)) {
    errors.title = 'This field is required';
  }
  if (Validator.isEmpty(data.date)) {
    errors.date = 'This field is required';
  }
  if (!Validator.isInt(data.spots)) {
    errors.spots = 'Needs to be a number';
  }
  if (Validator.isEmpty(data.spots)) {
    errors.spots = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
