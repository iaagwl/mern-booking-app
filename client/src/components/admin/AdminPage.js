import React from 'react';
import EventForm from './EventForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createEvent, updateEvent } from '../../actions/eventActions';
import { fetchClass } from '../../actions/classesActions';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params._id) {
      this.props.fetchClass(match.params._id);
    }
  }

  saveClass = ({_id, title, date}) => {
    if (_id) {
      return this.props.updateEvent({_id, title, date}).then(
        () => { this.setState({ redirect: true })},
      );
    } else {
       return this.props.createEvent({title, date}).then(
        () => { this.setState({ redirect: true })},
      );
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/classes" /> :
          <EventForm
            gymclass={this.props.gymclass}
            saveClass={this.saveClass}
          />
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
