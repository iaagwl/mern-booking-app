import React from 'react';
import PropTypes from 'prop-types';
import AttendeeCard from './AttendeeCard';

export default function AttendeeList({ attendees }) {
  const emptyMessage = (
    <p>There are no Attendees</p>
  );

  const attendeeList = (
    <div className="ui four cards">
      { attendees.map(attendee =>
          <AttendeeCard
            attendee={attendee}
            key={attendee._id}
          />
        )
      }
    </div>
  );
  return (
    <div className="attendees">
      <h1>Attendees</h1>
      {attendees.length === 0 ? emptyMessage : attendeeList }
    </div>
  );
}

AttendeeList.propTypes = {
  attendees: PropTypes.array.isRequired,
};
