import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import ClassList from './ClassList';
import { fetchClasses } from '../../actions/classesActions.js';
import { deleteEvent, applyForEvent } from '../../actions/eventActions.js';
import { addFlashMessage } from '../../actions/flashMessages';

class ClassPage extends React.Component {
  state = {
    errors: {},
    isLoading: false
  }

  componentDidMount() {
    this.props.fetchClasses();
  }

  applyForClass = (id) => {
    this.setState({errors: {}, isLoading: true});
    this.props.applyForEvent(id).then(
      (res) => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'You have successfully applied for class'
        })
        this.setState({ isLoading: false });
      },
      (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
    );;
  }

  render() {
    return (
      <div className={classnames('ui', 'form', { loading: this.state.isLoading })}>

        <h1>Classes:</h1>
        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
        <ClassList
          gymclasses={this.props.gymclasses}
          isAdmin={this.props.auth.isAdmin}
          deleteClass={this.props.deleteEvent}
          isAuthenticated={this.props.auth.isAuthenticated}
          applyForClass={this.applyForClass}
        />
      </div>
    );
  }

}

ClassPage.propTypes = {
  auth: PropTypes.object.isRequired,
  gymclasses: PropTypes.array.isRequired,
  fetchClasses: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  applyForEvent: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    gymclasses: state.gymclasses
  }
}

export default connect(mapStateToProps, { fetchClasses, deleteEvent, addFlashMessage, applyForEvent })(ClassPage);
