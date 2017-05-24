import React from 'react';
import PropTypes from 'prop-types';
import GymClass from './GymClass';

export default function ClassList({ gymclasses }) {
  const emptyMessage = (
    <p>There are no upcoming classes</p>
  );

  const gymClassList = (
    <div className="ui four cards">
      { gymclasses.map(gymclass => <GymClass gymclass={gymclass} key={gymclass._id} />) }
    </div>
  );
  return (
    <div>
      {gymclasses.length === 0 ? emptyMessage : gymClassList }
    </div>
  );
}

ClassList.propTypes = {
  gymclasses: PropTypes.array.isRequired
};
