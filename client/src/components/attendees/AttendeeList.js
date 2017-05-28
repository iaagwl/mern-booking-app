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
    <div>
      <h2>Attendees</h2>
      {attendees.length === 0 ? emptyMessage : attendeeList }
    </div>
  );
}

AttendeeList.propTypes = {
  attendees: PropTypes.array.isRequired,
};
