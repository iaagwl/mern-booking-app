import React from 'react';
import EventForm from './EventForm';
import AttendeeList from '../attendees/AttendeeList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createEvent, updateEvent } from '../../actions/eventActions';
import { fetchClass } from '../../actions/classesActions';

class AdminPage extends React.Component {
  state = {
    redirect: false,
    attendees: []
  };

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params._id) {
      this.props.fetchClass(match.params._id)
        .then(gymclass => {
          console.log(gymclass.gymclass.attendees);
          this.setState({attendees: gymclass.gymclass.attendees});
        });
    }
  }

  saveClass = ({_id, title, date, spots}) => {
    if (_id) {
      return this.props.updateEvent({_id, title, date, spots}).then(
        () => { this.setState({ redirect: true })},
      );
    } else {
       return this.props.createEvent({title, date, spots}).then(
        () => { this.setState({ redirect: true })},
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/classes" /> :
          <div>
            <EventForm
              gymclass={this.props.gymclass}
              saveClass={this.saveClass}
            />
            {this.props.match.params._id ? <AttendeeList attendees={this.state.attendees}/> : null}
          </div>
        }
      </div>
    );
  }
}

AdminPage.propTypes = {
  createEvent: PropTypes.func.isRequired,
  fetchClass: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  const { match } = props
  if (match.params._id) {
    return {
      gymclass: state.gymclasses.find(item => item._id === match.params._id)
    }
  }

  return { gymclass: null }
}

export default connect(mapStateToProps, { createEvent, fetchClass, updateEvent })(AdminPage)
