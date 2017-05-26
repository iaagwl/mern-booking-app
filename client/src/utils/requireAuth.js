import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAdmin) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login as admin to access this page'
        });
        this.context.router.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAdmin) {
        this.context.router.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAdmin: state.auth.isAdmin
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
