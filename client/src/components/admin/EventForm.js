import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../../utils/eventValidation';
import TextFieldGroup from '../common/TextFieldGroup';

class EventForm extends React.Component {
  state = {
    _id: this.props.gymclass ? this.props.gymclass._id : null,
    title: this.props.gymclass ? this.props.gymclass.title : '',
    date: this.props.gymclass ? this.props.gymclass.date : '',
    errors: {},
    isLoading: false
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.gymclass._id,
      title: nextProps.gymclass.title,
      date: nextProps.gymclass.date,
    })
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

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()){
      const { _id, title, date } = this.state;
      this.setState({ errors: {}, isLoading: true });
      this.props.saveClass({ _id, title, date })
        .catch((err) => this.setState({ errors: err.response.data.errors, isLoading: false }));
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
        { form }
      </div>
    );
  }

}

EventForm.propTypes = {
  saveClass: PropTypes.func.isRequired
}

export default EventForm;
