import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../utils/signupValidation';

class SignupForm extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {},
    isLoading: false,
    invalid: false
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  checkUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.doesUserExist(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user.length) {
          errors[field] = field.charAt(0).toUpperCase() + field.slice(1) + ' already exists';
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.isValid()){
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You have signed up successfully. Welcome!'
          })
          this.context.router.history.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]){
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <form className={classnames('ui', 'form', { loading: this.state.isLoading })} onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          handleChange={this.handleChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          handleChange={this.handleChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          field="email"
          type="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          handleChange={this.handleChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          handleChange={this.handleChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

        <input disabled={this.state.isLoading || this.state.invalid}
          type="submit"
        />
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  doesUserExist: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignupForm;
