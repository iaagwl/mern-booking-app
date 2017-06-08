import React from 'react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="login-form">
          <LoginForm />
        </div>
      </div>
    );
  }

}

export default LoginPage;
