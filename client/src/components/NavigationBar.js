import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

class NavigationBar extends React.Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated, isAdmin } = this.props.auth;

    const userLinks = (
      <div className="menu">
        <div className="left-menu">
          <NavLink className="item" to="/" exact activeClassName="active">Home</NavLink>
        </div>
        <div className="right-menu">
          <NavLink className="item" to="/classes" activeClassName="active">Classes</NavLink>
          <div className="user-menu">
            <a href="/" className="item" onClick={this.logout}>Logout</a>
          </div>
        </div>
      </div>
    );

    const adminLinks = (
      <div className="menu">
        <div className="left-menu">
          <NavLink className="item" to="/" exact activeClassName="active">Home</NavLink>
        </div>
        <div className="right-menu">
          <NavLink className="item" to="/classes" activeClassName="active">Classes</NavLink>
          <NavLink className="item" to="/admin" activeClassName="active">Admin</NavLink>
          <div className="user-menu">
            <a href="/" className="item" onClick={this.logout}>Logout</a>
          </div>
        </div>
      </div>
    );

    const authLinks = isAdmin ? adminLinks : userLinks;

    const guestLinks = (
      <div className="ui menu">
        <div className="left-menu">
          <NavLink className="item" to="/" exact activeClassName="active">Home</NavLink>
        </div>
        <div className="right-menu">
          <NavLink className="item" to="/classes" activeClassName="active">Classes</NavLink>
          <div className="user-menu">
            <NavLink className="item" to="/signup" activeClassName="active">Signup</NavLink>
            <NavLink className="item" to="/login" activeClassName="active">Login</NavLink>
          </div>
        </div>
      </div>
    );

    return (
      <nav className="navbar">
        { isAuthenticated ? authLinks : guestLinks }
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
