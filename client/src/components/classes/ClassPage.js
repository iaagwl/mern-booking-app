import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClassList from './ClassList';
import { fetchClasses } from '../../actions/classesActions.js';

class ClassPage extends React.Component {
  componentDidMount() {
    this.props.fetchClasses();
  }

  render() {
    return (
      <div>
        <h1>Classes:</h1>

        <ClassList gymclasses={this.props.gymclasses} />
      </div>
    );
  }

}

ClassPage.propTypes = {
  gymclasses: PropTypes.array.isRequired,
  fetchClasses: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    gymclasses: state.gymclasses
  }
}

export default connect(mapStateToProps, { fetchClasses })(ClassPage);
