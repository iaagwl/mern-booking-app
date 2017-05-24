import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div className="ui menu">
        <NavLink className="item" to="/" exact activeClassName="active">Home</NavLink>
        <NavLink className="item" to="/classes" activeClassName="active">Classes</NavLink>
        <div className="right menu">
          <NavLink className="item" to="/admin" activeClassName="active">Admin</NavLink>
          <a href="/" className="item" onClick={this.logout.bind(this)}>Logout</a>
        </div>
      </div>
    );

    const guestLinks = (

      <div className="ui menu">
        <NavLink className="item" to="/" exact activeClassName="active">Home</NavLink>
        <NavLink className="item" to="/classes" activeClassName="active">Classes</NavLink>
        <div className="right menu">
          <NavLink className="item" to="/signup" activeClassName="active">Signup</NavLink>
          <NavLink className="item" to="/login" activeClassName="active">Login</NavLink>
        </div>
      </div>
    );

    return (
      <nav className="navbar">
        { isAuthenticated ? userLinks : guestLinks }
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps, { logout })(NavigationBar));
