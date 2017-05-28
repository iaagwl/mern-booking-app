import React from 'react';
import PropTypes from 'prop-types';

export default function AttendeeCard({ attendee }) {

  return (
    <div className="ui card">
      <div className="content">
        <div className="header">
          {attendee.username}
        </div>
        <div>{attendee.email}</div>
      </div>
    </div>
  )
}

AttendeeCard.propTypes = {
  attendee: PropTypes.object.isRequired
}
