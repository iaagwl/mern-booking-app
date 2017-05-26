import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClassList from './ClassList';
import { fetchClasses } from '../../actions/classesActions.js';
import { deleteEvent } from '../../actions/eventActions.js';

class ClassPage extends React.Component {
  componentDidMount() {
    this.props.fetchClasses();
  }

  render() {
    return (
      <div>
        <h1>Classes:</h1>

        <ClassList
          gymclasses={this.props.gymclasses}
          isAdmin={this.props.auth.isAdmin}
          deleteClass={this.props.deleteEvent}
        />
      </div>
    );
  }

}

ClassPage.propTypes = {
  auth: PropTypes.object.isRequired,
  gymclasses: PropTypes.array.isRequired,
  fetchClasses: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    gymclasses: state.gymclasses
  }
}

export default connect(mapStateToProps, { fetchClasses, deleteEvent })(ClassPage);
