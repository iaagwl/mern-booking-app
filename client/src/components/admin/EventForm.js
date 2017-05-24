import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import validateInput from '../../utils/eventValidation';
import { createEvent } from '../../actions/eventActions';
import { fetchClass } from '../../actions/classesActions';
import TextFieldGroup from '../common/TextFieldGroup';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.gymclass ? this.props.gymclass._id : null,
      title: this.props.gymclass ? this.props.gymclass.title : '',
      date: this.props.gymclass ? this.props.gymclass.date : '',
      errors: {},
      isLoading: false,
      done: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.gymclass._id,
      title: nextProps.gymclass.title,
      date: nextProps.gymclass.date,
    })
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params._id) {
      this.props.fetchClass(match.params._id);
    }
  }

  handleChange(e) {
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

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()){
      this.setState({ errors: {}, isLoading: true });
      this.props.createEvent(this.state).then(
        () => { this.setState({ done: true })},
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  render() {
    const { title, errors, isLoading, date } = this.state;
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.isLoading })} onSubmit={this.handleSubmit}>
        <h1>Create New</h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
        <TextFieldGroup
          field="title"
          label="Event Title"
          name="title"
          value={title}
          handleChange={this.handleChange}
          error={errors.title}
        />

        <TextFieldGroup
          field="date"
          label="Date"
          name="date"
          value={date}
          handleChange={this.handleChange}
          error={errors.date}
        />

        <div className="field">
          <button className="ui primary button" disabled={isLoading}>Save</button>
        </div>
      </form>
    );

    return (
      <div>
        { this.state.done ? <Redirect to='/classes' /> : form }
      </div>
    );
  }

}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired
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

export default connect(mapStateToProps, { createEvent, fetchClass })(EventForm);
