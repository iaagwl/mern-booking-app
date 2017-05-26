import React from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../utils/loginValidation';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { addFlashMessage } from '../../actions/flashMessages';

class LoginForm extends React.Component {
  state = {
    identifier: '',
    password: '',
    errors: {},
    isLoading: false
  };

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true }, () => {
        this.props.login(this.state).then(
          (res) => {
            this.props.addFlashMessage({
              type: 'success',
              text: 'Welcome!'
            })
            this.context.router.history.push('/');
          },
          (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
        );
      });
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
    const { errors, identifier, password, isLoading } = this.state;
    return (
      <form className={classnames('ui', 'form', { loading: this.state.isLoading })} onSubmit={this.handleSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          handleChange={this.handleChange}
        />
        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          handleChange={this.handleChange}
          type="password"
        />

        <input disabled={isLoading}
          type="submit"
          className="ui primary button"
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login, addFlashMessage })(LoginForm);
